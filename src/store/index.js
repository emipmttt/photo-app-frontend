import {
  createStore
} from 'vuex';

export default createStore({
  state: {
    scanInterval: null
  },
  mutations: {
    updateState(state, {
      prop,
      value
    }) {
      state[prop] = value
    }
  },
  actions: {},
  modules: {}
})