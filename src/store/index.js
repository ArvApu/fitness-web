import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

import apiPlugin from '@/api/plugin';
import broadcast from '@/broadcast'

import auth from './modules/auth'
import exercises from './modules/exercises'
import messages from './modules/messages'
import rooms from './modules/rooms'

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
    messages,
    rooms,
  },
  plugins: [apiPlugin, persistedState, broadcast],
  strict: debug
})
