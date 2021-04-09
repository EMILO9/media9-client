import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    pcs: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setPcs(state, payload) {
      state.pcs = payload
    },
    setSelectedPc(state, payload) {
      state.selectedPc = payload
    }
  },
  actions: {},
  modules: {},
  getters: {
    user: (state) => state.user,
    pcs: (state) => state.pcs
  }
});
