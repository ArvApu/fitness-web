import api from "@/api";

const state = {
    exercises: []
};

const getters = {};

const mutations = {
    SET_EXERCISES(state, exercises) {
        state.exercises = exercises;
    }
};

const actions = {
    async fetchExercises({ commit }) {
        try {
            const response = await api.exercises.all();
            commit('SET_EXERCISES', response.data);
        } catch (e) {
            console.log(e);
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