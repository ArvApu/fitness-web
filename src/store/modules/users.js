import api from "@/api";

const state = {
    users: [],
    errors: [],
    isLoading: false,
};

const getters = {};

const mutations = {
    SET_USERS(state, users) {
        state.users = users;
    },
    SET_IS_LOADING(state, status) {
        state.isLoading = status;
    },
    SET_ERRORS(state, errors) {
        state.errors = errors;
    },
};

const actions = {
    async fetchAll({ commit }) {
        try {
            const response = await api.users.get();
            commit('SET_USERS', response.data.data);
        } catch (e) {
            commit('SET_ERRORS', e.response.data.error);
            return Promise.reject(e);
        }
    },
    async invite({ commit }, email) {
        try {
            commit('SET_IS_LOADING', true);
            await api.users.invite(email);
            // TODO: success message
        } catch (e) {
            commit('SET_ERRORS', e.response.data.error);
            return Promise.reject(e);
        } finally {
            commit('SET_IS_LOADING', false);
        }
    },
    async confirmInvite({ commit }, token) {
        try {
            await api.users.confirmInvite(token);
            // TODO: success message
        } catch (e) {
            commit('SET_ERRORS', e.response.data.error);
            return Promise.reject(e);
        }
    },
    clearErrors({ commit }) {
        commit('SET_ERRORS', []);
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