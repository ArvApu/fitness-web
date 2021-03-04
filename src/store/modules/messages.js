import api from "@/api";

const state = {
    messages: [],
    rooms: [],
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

    async loadRooms({ commit, rootState }) {

        // TODO: Refactor

        const currentUser = rootState.auth.user;

        const response = await api.users.get();

        const users = response.data;
        const rooms = [];

        for (let i = 0; i < users.length; i++) {

            const user = users[i];

            rooms.push({
                roomId: i + 1,
                roomName: user.first_name,
                avatar: `https://robohash.org/${user.email}`,
                users: [
                    {
                        _id: currentUser.id,
                        username: currentUser.first_name,
                        avatar: `https://robohash.org/${currentUser.email}`,
                    },
                    {
                        _id: user.id,
                        username: user.first_name,
                        avatar: `https://robohash.org/${user.email}`,
                    }
                ],
            });
        }

        commit('SET_ROOMS', rooms);
    }

};

const module = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};

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

export default module;