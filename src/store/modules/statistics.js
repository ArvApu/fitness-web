import api from "@/api";

const state = {};

const getters = {};

const mutations = {};

const actions = {
    async workouts(context, { userId }) {
        try {
            const response = await api.statistics.workouts(userId);
            return response.data;
        } catch (e) {
            this._vm.$toast.error('Failed to load workouts statistics.');
            return Promise.reject(e);
        }
    },
    async workout(context, { id, userId }) {
        try {
            const response = await api.statistics.workout(id, userId);
            return response.data;
        } catch (e) {
            this._vm.$toast.error('Failed to load workout statistics.');
            return Promise.reject(e);
        }
    },
    async exercises(context, { userId }) {
        try {
            const response = await api.statistics.exercises(userId);
            return response.data;
        } catch (e) {
            this._vm.$toast.error('Failed to load exercises statistics.');
            return Promise.reject(e);
        }
    },
    async exercise(context, { id, userId }) {
        try {
            const response = await api.statistics.exercise(id, userId);
            return response.data;
        } catch (e) {
            this._vm.$toast.error('Failed to load exercise statistics.');
            return Promise.reject(e);
        }
    },
    async weight(context, { userId }) {
        try {
            const response = await api.statistics.weight(userId);
            return response.data;
        } catch (e) {
            this._vm.$toast.error('Failed to load weight statistics.');
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