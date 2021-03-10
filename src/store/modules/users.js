import api from "@/api";

const state = {
    users: [],
    isLoading: false,
};

const getters = {};

const mutations = {
    SET_USERS(state, users) {
        state.users = users;
    },
    SET_IS_LOADING(state, status) {
        state.isLoading = status;
    }
};

const actions = {
    async fetchAll({ commit }) {
        try {
            const response = await api.users.get();
            commit('SET_USERS', response.data);
        } catch (e) {
            return Promise.reject(e);
        }
    },
    async invite({ commit }, email) {
        try {
            commit('SET_IS_LOADING', true);
            await api.users.invite(email);
            // TODO: success message
        } catch (e) {
            return Promise.reject(e);
        } finally {
            commit('SET_IS_LOADING', false);
        }
    },
    async confirmInvite(context, token) {
        try {
            await api.users.confirmInvite(token);
            // TODO: success message
        } catch (e) {
            return Promise.reject(e);
        }
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