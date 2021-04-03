// 将vuex的module模板转换成reducer
// 使用redux、react-redux和redux-thunk应该可以实现
import { createStore, combineReducers } from 'redux'

function transformVuexModule2Reducer(module, namespace) {
  const { state: initState, mutations } = module
  return (state = initState, action) => {
    const { type, payload } = action
    const [name, t] = type.split('/')
    if (name !== namespace) {
      return state
    }

    // 内部允许直接通过state.xx修改，与vuex保持一致
    mutations[t](state, payload)

    // eslint-disable-next-line no-param-reassign
    module.state = { ...state } // 更新成新的state, 需要考虑深拷贝

    return module.state
  }
}

export function initStore({ modules }) {
  const keys = Object.keys(modules)
  const reducers = keys.reduce((acc, key) => {
    acc[key] = transformVuexModule2Reducer(modules[key], key)
    return acc
  }, {})

  // 使用combine reducer等将vue module转换成 reducer
  const initState = keys.reduce((acc, key) => {
    acc[key] = modules[key].state
    return acc
  }, {})

  const rootReducer = combineReducers(reducers)
  const store = createStore(rootReducer, initState)

  // 同步action
  const commit = (type, payload) => {
    store.dispatch({ type, payload })
  }

  // 异步action
  const dispatch = async (type, payload) => {
    const [name, t] = type.split('/')
    const { actions, state } = modules[name]
    // 处理当前作用域下的action
    const nameDispatch = (type, payload, opt) => {
      if (opt && opt.root) {
        return dispatch(type, payload)
      }
      return dispatch(`${name}/${t}`, payload)
    }
    const nameCommit = (type, payload, opt) => {
      if (opt && opt.root) {
        return commit(type, payload)
      }
      return commit(`${name}/${type}`, payload)
    }
    await actions[t]({
      commit: nameCommit,
      state,
      rootState: store.getState(),
      dispatch: nameDispatch,
    }, payload)
  }

  const rootGetters = new Proxy({}, {
    get(target, type) {
      const [name, t] = type.split('/')
      const { getters, state } = modules[name]

      const nameGetters = new Proxy({}, {
        get(target, type) {
          return getters[type](state, nameGetters, store.getState(), rootGetters)
        },
      })

      return getters[t](state, nameGetters, store.getState(), rootGetters)
    },
  })

  return {
    reduxStore: store,
    get state() {
      return store.getState()
    },
    getters: rootGetters,
    commit,
    dispatch,
  }
}
