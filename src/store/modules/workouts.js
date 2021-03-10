import api from "@/api";

const state = {
    workouts: [],
    errors: [],
    isLoading: false,
};

const getters = {};

const mutations = {
    SET_IS_LOADING(state, isLoading) {
        state.isLoading = isLoading;
    },
    SET_WORKOUTS(state, workouts) {
        state.workouts = workouts;
    },
    SET_ERRORS(state, errors) {
        state.errors = (Array.isArray(errors)) ? errors : [errors];
    },
    ADD_WORKOUT(state, workout) {
        state.workouts.unshift(workout);
    },
    UPDATE_WORKOUT(state, workout) {
        state.workouts = state.workouts.map((e) =>
            e.id === workout.id ? workout : e
        );
    },
    DELETE_WORKOUT(state, id) {
        state.workouts = state.workouts.filter((e) => e.id !== id);
    },
};

const actions = {
    async fetchAll({ commit }) {
        try {
            commit('SET_IS_LOADING', true);
            const response = await api.workouts.all();
            commit('SET_WORKOUTS', response.data.data);
        } catch (e) {
            commit('SET_ERRORS', e.response.data.error);
            return Promise.reject(e);
        } finally {
            commit('SET_IS_LOADING', false);
        }
    },
    async fetchOne({ commit }, id) {
        try {
            commit('SET_IS_LOADING', true);
            const response = await api.workouts.single(id);
            return response.data ?? null;
        } catch (e) {
            commit('SET_ERRORS', e.response.data.error);
            return Promise.reject(e);
        } finally {
            commit('SET_IS_LOADING', false);
        }
    },
    async create({ commit }, workout) {
        try {
            const response = await api.workouts.create(workout);
            if (response && response.data && response.status === 201) {
                commit('ADD_WORKOUT', response.data);
            }
        } catch (e) {
            commit('SET_ERRORS', e.response.data.error);
            return Promise.reject(e);
        }
    },
    async update({ commit }, workout) {
        try {
            const response = await api.workouts.update(workout.id, workout);
            if (response && response.data && response.status === 200) {
                commit('UPDATE_WORKOUT', response.data);
            }
        } catch (e) {
            commit('SET_ERRORS', e.response.data.error);
            return Promise.reject(e);
        }
    },
    async delete({ commit }, id) {
        try {
            const response = await api.workouts.destroy(id);
            if (response && response.status === 204) {
                commit('DELETE_WORKOUT', parseInt(id));
            }
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