const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
export default {
  namespaced: true,
  state: {
    count1: 0,
  },
  mutations: {
    setCount1(state, payload) {
      state.count1 = payload
    },
  },
  getters: {
    doubleCount(state) {
      return state.count1 * 2
    },
    minusCount() {
      return 'xxx sub minusCount'
    },
  },
  actions: {
    async fetchCount1({ rootState, commit }) {
      await sleep(500)
      commit('setCount1', rootState.test.count1 + 1)
    },
  },
}
