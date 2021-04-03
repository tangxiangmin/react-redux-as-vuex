export default {
  namespaced: true,
  state: {
    list: [],
  },
  mutations: {
    setList(state, payload) {
      state.list = payload
    },
  },
  actions: {
    async addList({ state, commit }, payload) {
      const { list } = state
      commit('setList', [...list, payload])
    },
    async removeItem({ state, commit }, { id }) {
      const { list } = state
      const item = list.find((item) => item.id === id)
      const idx = list.indexOf(item)
      list.splice(idx, 1)
      commit('setList', [...list])
    },
  },
}
