import api from "@/api";

const state = {
    exercises: [],
    isLoading: false,
    errors: [],
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
    SET_EXERCISES(state, exercises) {
        state.exercises = exercises;
    },
    SET_ERRORS(state, errors) {
        state.errors = errors;
    },
    SET_PAGINATOR(state, paginator) {
        state.paginator = paginator;
    },
    UPDATE_EXERCISE(state, exercise) {
        state.exercises = state.exercises.map((e) =>
            e.id === exercise.id ? exercise : e
        );
    },
};

const actions = {
    async fetchAll({ commit }, {page, search}) {
        try {
            commit('SET_IS_LOADING', true);
            const response = await api.exercises.all(page, search);
            commit('SET_EXERCISES', response.data.data);
            commit('SET_PAGINATOR', {
                currentPage: response.data.meta.current_page,
                lastPage: response.data.meta.last_page,
                total: response.data.meta.total,
                perPage: response.data.meta.per_page,
            });
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
    async create({ state, dispatch, commit }, data) {
        try {
            await api.exercises.create(data);
            dispatch('fetchAll', state.paginator.currentPage );
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
    async delete({ state, dispatch }, id) {
        try {
            await api.exercises.destroy(id);
            dispatch('fetchAll', state.paginator.currentPage );
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