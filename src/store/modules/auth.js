import api from "@/api";

const state = {
    accessToken: null,
    expiryTime: null,
    user: null,
    refreshFailed: false,
};

const getters = {};

const mutations = {
    SET_ACCESS_TOKEN(state, token) {
        state.accessToken = token;
    },
    SET_EXPIRY_TIME(state, time) {
        state.expiryTime = time;
    },
    SET_USER(state, user) {
        state.user = user;
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

            dispatch('getCurrentUserInformation');
            dispatch('calculateExpireTime', response.data.expires_in);

            return response;
        } catch (e) {
            return Promise.reject(e);
        }
    },

    async refresh({ commit, dispatch}) {

        commit('SET_REFRESH_FAILED', true); // Lets assume that refresh fails so that no thread would try to refresh.

        try {
            const response = await api.auth.refresh();

            commit('SET_REFRESH_FAILED', false); // Refresh was successful so we change assumption that refresh failed to reality
            commit('SET_ACCESS_TOKEN', response.data.access_token);

            dispatch('getCurrentUserInformation');
            dispatch('calculateExpireTime', response.data.expires_in);

            return response;
        } catch (e) {
            return Promise.reject(e);
        }
    },

    async logout({ dispatch }) {
        await api.auth.logout();

        dispatch('clearSession');

        setTimeout(() => {
            location.reload();
        }, 500);
    },

    async getCurrentUserInformation({ commit }) {
        try {
            const response = await api.auth.me();
            const user = response.data;

            commit('SET_USER', {
                id: user.id,
                role: user.role,
                first_name: user.first_name,
                email: user.email,
                last_login_at: user.last_login_at,
            });

            return response;
        } catch (e) {
            return Promise.reject(e);
        }
    },

    calculateExpireTime({ commit }, expiresIn) {
        commit('SET_EXPIRY_TIME', Date.now() + expiresIn)
    },

    clearSession({ commit }) {
        commit('SET_ACCESS_TOKEN', null);
        commit('SET_EXPIRY_TIME', null);
        commit('SET_USER', null);

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