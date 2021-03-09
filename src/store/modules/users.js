import api from "@/api";

const state = {
    users: [],
};

const getters = {};

const mutations = {
    SET_USERS(state, users) {
        state.users = users;
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