import api from "@/api";

const state = {
    logs: [],
    errors: [],
    isLoading: false,
};

const getters = {};

const mutations = {
    SET_IS_LOADING(state, isLoading) {
        state.isLoading = isLoading;
    },
    SET_WORKOUT_LOGS(state, logs) {
        state.logs = logs;
    },
    SET_ERRORS(state, errors) {
        state.errors = errors;
    },
    ADD_WORKOUT_LOG(state, log) {
        state.logs.unshift(log);
    },
    DELETE_WORKOUT_LOG(state, id) {
        state.logs = state.logs.filter((e) => e.id !== id);
    },
};

const actions = {
    async fetchAll({ commit }) {
        try {
            commit('SET_IS_LOADING', true);
            const response = await api.workoutLogs.all();
            commit('SET_WORKOUT_LOGS', response.data.data);
        } catch (e) {
            this._vm.$toast.error('Failed to fetch workout logs.');
            return Promise.reject(e);
        } finally {
            commit('SET_IS_LOADING', false);
        }
    },
    async fetchOne({ commit }, id) {
        try {
            commit('SET_IS_LOADING', true);
            const response = await api.workoutLogs.single(id);
            return response.data ?? null;
        } catch (e) {
            this._vm.$toast.error('Failed to fetch a workout log.');
            return Promise.reject(e);
        } finally {
            commit('SET_IS_LOADING', false);
        }
    },
    async create({ commit }, workout) {
        try {
            const response = await api.workoutLogs.create(workout);
            if (response && response.data && response.status === 201) {
                commit('ADD_WORKOUT_LOG', response.data);
            }
            this._vm.$toast.success('Workout log created.');
        } catch (e) {
            commit('SET_ERRORS', e.response.data.error);
            return Promise.reject(e);
        }
    },
    async delete({ commit }, id) {
        try {
            const response = await api.workoutLogs.destroy(id);
            if (response && response.status === 204) {
                commit('DELETE_WORKOUT_LOG', parseInt(id));
            }
            this._vm.$toast.success('Workout log deleted.');
        } catch (e) {
            this._vm.$toast.error('Failed to delete a workout log.');
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