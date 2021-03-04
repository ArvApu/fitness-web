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
        state.messages.push(message);
    },
    SET_ROOMS(state, rooms) {
        state.rooms = rooms;
    }
};

const actions = {
    async fetchAll({ commit }, userId) {

        try {
            commit('SET_IS_LOADING', true);
            const response = await api.messages.getByUser(userId);

            const messages = [];
            for (let i = 0; i < response.data.length; i++) {
                messages.push(parseMessage(response.data[i]));
            }

            commit('SET_MESSAGES', messages)
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
                commit('ADD_MESSAGE', parseMessage(response.data));
            }
        } catch (e) {
            return Promise.reject(e);
        }
    },

    receive({ commit }, message) {
        commit('ADD_MESSAGE', parseMessage(message));
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

/* Module helper methods */

function parseMessage(message) {

    const date = new Date(message.created_at);
    const dateString = date.toISOString();

    return {
        _id: message.id,
        content: message.message,
        senderId: message.sender_id,
        date: dateString.split('T')[0],
        timestamp: dateString.match(/\d\d:\d\d/)[0],
        saved: true,
        distributed: true,
        seen: message.is_seen,
        disableActions: true,
        disableReactions: true,
    }
}