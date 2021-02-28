import api from "@/api";

const state = {
    accessToken: null,
    expiryTime: null,
    refreshFailed: false
};

const getters = {};

const mutations = {
    SET_ACCESS_TOKEN(state, token) {
        state.accessToken = token;
    },
    SET_EXPIRY_TIME(state, time) {
        state.expiryTime = time;
    },
    SET_REFRESH_FAILED(state, status) {
        state.refreshFailed = status;
    }
};

const actions = {
    async login({ commit, dispatch }, credentials) {
        try {
            const response = await api.auth.login(credentials);

            commit('SET_REFRESH_FAILED', false);
            commit('SET_ACCESS_TOKEN', response.data.access_token);

            dispatch('calculateExpireTime', response.data.expires_in);

            return response;
        } catch (e) {
            console.log(e);
        }
    },

    async refresh({ commit, dispatch}) {

        commit('SET_REFRESH_FAILED', true); // Lets assume that refresh fails so that no thread would try to refresh.

        try {
            const response = await api.auth.refresh();

            commit('SET_REFRESH_FAILED', false); // Refresh was successful so we change assumption that refresh failed to reality
            commit('SET_ACCESS_TOKEN', response.data.access_token);

            dispatch('calculateExpireTime', response.data.expires_in);

            return response;
        } catch (e) {
            console.log(e);
        }
    },

    async logout({ dispatch }) {
        await api.auth.logout();

        dispatch('clearSession');

        setTimeout(() => {
            location.reload();
        }, 500);
    },

    calculateExpireTime({ commit }, expiresIn) {
        commit('SET_EXPIRY_TIME', Date.now() + expiresIn)
    },

    clearSession({ commit }) {
        commit('SET_ACCESS_TOKEN', null);
        commit('SET_EXPIRY_TIME', null);

        window.localStorage.clear();
        window.sessionStorage.clear();
    }
};

const module = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};

export default module;