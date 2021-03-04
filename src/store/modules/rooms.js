import api from "@/api";

const state = {
    rooms: [],
};

const getters = {};

const mutations = {
    SET_ROOMS(state, rooms) {
        state.rooms = rooms;
    }
};

const actions = {
    async fetchAll({ commit, rootState }) {

        const rooms = [];
        const currentUser = rootState.auth.user;

        try {
            const response = await api.users.get();

            for (let i = 0; i < response.data.length; i++) {
                rooms.push(
                    buildRoom(i + 1, response.data[i], currentUser)
                );
            }

            commit('SET_ROOMS', rooms);
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

/* Module helper methods */

function buildRoom(id, user, currentUser) {
    return {
        roomId: id,
        roomName: `${user.first_name} ${user.last_name}`,
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
    }
}