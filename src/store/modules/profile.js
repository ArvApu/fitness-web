import api from "@/api";

const state = {
    errors: [],
};

const getters = {};

const mutations = {
    SET_ERRORS(state, errors) {
        state.errors = errors;
    },
};

const actions = {
    async update({ commit }, payload) {
        try {
            const response = await api.profile.update(payload);
            commit('auth/UPDATE_USER', response.data, { root: true })
            this._vm.$toast.success('Profile updated.');
        } catch (e) {
            commit('SET_ERRORS', e.response.data.error);
            return Promise.reject(e);
        }
    },
    async changePassword({ commit }, payload) {
        try {
            await api.profile.changePassword(payload);
            this._vm.$toast.success('Password changed.');
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