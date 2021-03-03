import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

import apiPlugin from '@/api/plugin';

import auth from './modules/auth'
import exercises from './modules/exercises'
import messages from './modules/messages'

Vue.use(Vuex)

const persistedState = createPersistedState({
  key: 'fitness_app_state',
  reducer: state => ({
    auth: state.auth,
  }),
});

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    exercises,
    messages
  },
  plugins: [apiPlugin, persistedState],
  strict: debug
})
