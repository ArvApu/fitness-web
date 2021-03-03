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
    ADD_SENT_MESSAGE(state, message) {
        state.messages.sent.push(message);
    },
};

const actions = {
    async fetchAll({ commit }, userId) {

        // const id = 1; // TODO: take it from auth

        try {
            commit('SET_IS_LOADING', true);

            const sent = await api.messages.getSent(userId);
            const received = await api.messages.getReceived(userId);

            commit('SET_MESSAGES', {
                sent: sent.data,
                received: received.data,
            })

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
                commit('ADD_SENT_MESSAGE', response.data);
            }
        } catch (e) {
            return Promise.reject(e);
        }
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