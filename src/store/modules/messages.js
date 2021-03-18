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
    }
};

const actions = {
    async fetchAll({ commit }, roomId) {

        try {
            commit('SET_IS_LOADING', true);
            const response = await api.rooms.messages(roomId);

            const messages = [];

            for (let i = 0; i < response.data.data.length; i++) {
                messages.unshift(parseMessage(response.data.data[i]));
            }

            commit('SET_MESSAGES', messages)
        } catch (e) {
            this._vm.$toast.error('Failed to fetch messages.');
            return Promise.reject(e);
        } finally {
            commit('SET_IS_LOADING', false);
        }
    },

    async send({ commit }, data) {
        try {
            const response = await api.messages.send(data.roomId, data.message);
            if (response && response.data && response.status === 201) {
                commit('ADD_MESSAGE', parseMessage(response.data));
            }
        } catch (e) {
            this._vm.$toast.error('Failed to send a message.');
            return Promise.reject(e);
        }
    },

    receive({ commit }, message) {

        if(message.room_id === 11111) { // TODO: check if room is opened, if yes add message
            commit('ADD_MESSAGE', parseMessage(message));
            return;
        }

        this._vm.$toast('You received a message.');
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
        senderId: message.user_id,
        date: dateString.split('T')[0],
        timestamp: dateString.match(/\d\d:\d\d/)[0],
        seen: message.is_seen,
        saved: true,
        distributed: true,
        disableActions: true,
        disableReactions: true,
    }
}