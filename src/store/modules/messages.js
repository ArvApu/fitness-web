import api from "@/api";

const state = {
    messages: [],
    isLoading: false,
};

const getters = {};

const mutations = {
    SET_IS_LOADING(state, isLoading) {
        state.isLoading = isLoading;
    },
    SET_MESSAGES(state, messages) {
        state.messages = messages;
    },
    ADD_MESSAGE(state, message) {
        state.messages.unshift(message);
    },
};

const actions = {
    async fetchAll({ commit }, userId) {

        try {
            commit('SET_IS_LOADING', true);
            const response = await api.messages.getByUser(userId);
            commit('SET_MESSAGES', response.data)
        } catch (e) {
            return Promise.reject(e);
        } finally {
            commit('SET_IS_LOADING', false);
        }
    },

    async send({ commit }, data) {
        try {
            const response = await api.messages.send(data.userId, data.message);
            if (response && response.data && response.status === 201) {
                commit('ADD_MESSAGE', response.data);
            }
        } catch (e) {
            return Promise.reject(e);
        }
    },

    receive({ commit }, message) {
        commit('ADD_MESSAGE', message);
    },
};

const module = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};

export default module;