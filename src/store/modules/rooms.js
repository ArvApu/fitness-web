import api from "@/api";

const state = {
    errors: [],
    rooms: [],
    isLoading: false,
};

const getters = {};

const mutations = {
    SET_IS_LOADING(state, isLoading) {
        state.isLoading = isLoading;
    },
    SET_ROOMS(state, rooms) {
        state.rooms = rooms;
    },
    SET_ERRORS(state, errors) {
        state.errors = errors;
    },
};

const actions = {
    async fetchAll({ commit }) {
        commit('SET_IS_LOADING', true);
        const rooms = [];

        try {
            const response = await api.rooms.all();

            for (let i = 0; i < response.data.data.length; i++) {
                rooms.push(parseRoom(response.data.data[i]));
            }

            commit('SET_ROOMS', rooms);
        } catch (e) {
            this._vm.$toast.error('Failed to fetch rooms.');
            return Promise.reject(e);
        } finally {
            commit('SET_IS_LOADING', false);
        }
    },
    async create({ commit, dispatch }, data) {
        try {
            const response = await api.rooms.create(data);
            if (response && response.data && response.status === 201) {
                dispatch('fetchAll');
            }
            this._vm.$toast.success('Room created.');
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

/* Module helper methods */

function parseRoom(room) {

    let users = [];

    for (let i = 0; i < room.users; i++) {
        users.push({
            _id: users[i].id,
            username: `${users[i].first_name} ${users[i].last_name}`,
        })
    }

    return {
        roomId: room.id,
        roomName: room.name,
        users: users,
    }
}