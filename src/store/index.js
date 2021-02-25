import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

const persistedState = createPersistedState({
  key: 'fitness_app_state',
});

export default new Vuex.Store({
  state: {
    user: { penis: 'large' }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  plugins: [persistedState]
})
