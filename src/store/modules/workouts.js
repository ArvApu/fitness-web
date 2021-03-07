import api from "@/api";

const state = {
    workouts: [],
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
    ADD_WORKOUT(state, workout) {
        state.workouts.unshift(workout);
    },
    UPDATE_WORKOUT(state, workout) {
        state.workouts = state.workouts.map((e) =>
            e.id === workout.id ? workout : e
        );
    },
    DELETE_WORKOUT(state, id) {
        console.log(id)
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
            return Promise.reject(e);
        } finally {
            commit('SET_IS_LOADING', false);
        }
    },
    async create({ commit }, data) {
        try {
            const response = await api.workouts.create(data);
            if (response && response.data && response.status === 201) {
                commit('ADD_WORKOUT', response.data);
            }
        } catch (e) {
            return Promise.reject(e);
        }
    },
    async update({ commit }, {id, data}) {
        try {
            const response = await api.workouts.update(id, data);
            if (response && response.data && response.status === 200) {
                commit('UPDATE_WORKOUT', response.data);
            }
        } catch (e) {
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