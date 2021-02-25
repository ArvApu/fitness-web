import api from "@/api";

const state = {
    accessToken: null,
    expiryTime: null
};

const getters = {
    getAccessToken: (state) => state.accessToken,
    getExpiryTime: (state) => state.expiryTime
};

const mutations = {
    SET_ACCESS_TOKEN(state, token) {
        state.accessToken = token;
    },

    SET_EXPIRY_TIME(state, time) {
        state.expiryTime = time;
    }
};

const actions = {
    login: async function({ commit, dispatch }, credentials) {
        try {
            const response = await api.auth.login(credentials);
            commit('SET_ACCESS_TOKEN', response.data.access_token);
            dispatch('calculateExpireTime', response.data.expires_in);
            return response;
        } catch (e) {
            console.log(e);
        }
    },

    refresh: async function({ commit, dispatch}) {
        try {
            const response = await api.auth.refresh();
            commit('SET_ACCESS_TOKEN', response.data.access_token);
            dispatch('calculateExpireTime', response.data.expires_in);
            return response;
        } catch (e) {
            console.log(e);
        }
    },

    logout: async function() {
        await api.auth.logout();

        window.localStorage.clear();
        window.sessionStorage.clear();

        setTimeout(() => {
            location.reload();
        }, 1000);
    },

    calculateExpireTime: function ({ commit }, expiresIn) {
        commit('SET_EXPIRY_TIME', Date.now() + expiresIn)
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