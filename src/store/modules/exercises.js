import api from "@/api";

const state = {
    exercises: [],
    isLoading: false,
};

const getters = {};

const mutations = {
    SET_IS_LOADING(state, isLoading) {
        state.isLoading = isLoading;
    },
    SET_EXERCISES(state, exercises) {
        state.exercises = exercises;
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
        console.log(id)
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
        } catch (e) {
            return Promise.reject(e);
        }
    },
    async update({ commit }, exercise) {
        try {
            const response = await api.exercises.update(exercise.id, exercise);
            if (response && response.data && response.status === 200) {
                commit('UPDATE_EXERCISE', response.data);
            }
        } catch (e) {
            return Promise.reject(e);
        }
    },
    async delete({ commit }, id) {
        try {
            const response = await api.exercises.destroy(id);
            if (response && response.status === 204) {
                commit('DELETE_EXERCISE', parseInt(id));
            }
        } catch (e) {
            return Promise.reject(e);
        }
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