import api from "@/api";

const state = {
    exercises: [],
    isLoading: false,
    errors: [],
};

const getters = {};

const mutations = {
    SET_IS_LOADING(state, isLoading) {
        state.isLoading = isLoading;
    },
    SET_EXERCISES(state, exercises) {
        state.exercises = exercises;
    },
    SET_ERRORS(state, errors) {
        state.errors = errors;
    },
    ADD_EXERCISE(state, exercise) {
        state.exercises.unshift(exercise);
    },
    UPDATE_EXERCISE(state, exercise) {
        state.exercises = state.exercises.map((e) =>
            e.id === exercise.id ? exercise : e
        );
    },
    DELETE_EXERCISE(state, id) {
        state.exercises = state.exercises.filter((e) => e.id !== id);
    },
};

const actions = {
    async fetchAll({ commit }) {
        try {
            commit('SET_IS_LOADING', true);
            const response = await api.exercises.all();
            commit('SET_EXERCISES', response.data.data);
        } catch (e) {
            this._vm.$toast.error('Failed to fetch exercises.');
            return Promise.reject(e);
        } finally {
            commit('SET_IS_LOADING', false);
        }
    },
    async fetchOne({ commit }, id) {
        try {
            commit('SET_IS_LOADING', true);
            const response = await api.exercises.single(id);
            return response.data ?? null;
        } catch (e) {
            this._vm.$toast.error('Failed to fetch an exercise.');
            return Promise.reject(e);
        } finally {
            commit('SET_IS_LOADING', false);
        }
    },
    async create({ commit }, data) {
        try {
            const response = await api.exercises.create(data);
            if (response && response.data && response.status === 201) {
                commit('ADD_EXERCISE', response.data);
            }
            this._vm.$toast.success('Exercise created.');
        } catch (e) {
            commit('SET_ERRORS', e.response.data.error);
            return Promise.reject(e);
        }
    },
    async update({ commit }, exercise) {
        try {
            const response = await api.exercises.update(exercise.id, exercise);
            if (response && response.data && response.status === 200) {
                commit('UPDATE_EXERCISE', response.data);
            }
            this._vm.$toast.success('Exercise updated.');
        } catch (e) {
            commit('SET_ERRORS', e.response.data.error);
            return Promise.reject(e);
        }
    },
    async delete({ commit }, id) {
        try {
            const response = await api.exercises.destroy(id);
            if (response && response.status === 204) {
                commit('DELETE_EXERCISE', parseInt(id));
            }
            this._vm.$toast.success('Exercise deleted.');
        } catch (e) {
            this._vm.$toast.error('Failed to delete an exercise.');
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