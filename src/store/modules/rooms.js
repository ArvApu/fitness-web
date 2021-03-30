import api from "@/api";

const state = {
    errors: [],
    rooms: [],
    isLoading: false,
    paginator: {
        currentPage: 1,
        lastPage: 1,
        total: 0,
        perPage: 0,
    },
};

const getters = {};

const mutations = {
    SET_IS_LOADING(state, isLoading) {
        state.isLoading = isLoading;
    },
    SET_ROOMS(state, rooms) {
        state.rooms = rooms;
    },
    ADD_ROOMS(state, rooms)  {
        state.rooms.push(...rooms);
    },
    SET_ERRORS(state, errors) {
        state.errors = errors;
    },
    SET_PAGINATOR(state, paginator) {
        state.paginator = paginator;
    },
    SET_ROOM_MESSAGES_COUNT(state, {id, count}) {
        console.log(id, count);
        state.rooms = state.rooms.map((room) => {
            if (room.roomId === id) {
                room.unreadCount = count;
            }
            return room;
        });
        console.log(state.rooms);
    },
};

const actions = {
    async fetchAll({ state, commit }, page) {
        try {
            commit('SET_IS_LOADING', true);
            const response = await api.rooms.all(page ?? state.paginator.currentPage);

            commit('SET_PAGINATOR', {
                currentPage: response.data.meta.current_page,
                lastPage: response.data.meta.last_page,
                total: response.data.meta.total,
                perPage: response.data.meta.per_page,
            });

            const rooms = [];

            for (let i = 0; i < response.data.data.length; i++) {
                rooms.push(parseRoom(response.data.data[i]));
            }

            commit('ADD_ROOMS', rooms);
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
                dispatch('resetRooms');
                dispatch('fetchAll');
            }
            this._vm.$toast.success('Room created.');
        } catch (e) {
            commit('SET_ERRORS', e.response.data.error);
            return Promise.reject(e);
        }
    },
    async readMessages({ commit }, id) {
        try {
            await api.rooms.readMessages(id);
            commit('SET_ROOM_MESSAGES_COUNT', {id: id, count: 0});
        } catch (e) {
            return Promise.reject(e);
        }
    },
    clearErrors({ commit }) {
        commit('SET_ERRORS', []);
    },
    resetRooms({ commit }) {
        commit('SET_ROOMS', []);
        commit('SET_PAGINATOR', {
            currentPage: 0,
            lastPage: 1,
            total: 0,
            perPage: 0,
        });
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
        unreadCount: room.unread_count,
    }
}