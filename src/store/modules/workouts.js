import api from "@/api";

const state = {
    workouts: [],
    errors: [],
    isLoading: false,
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
    SET_WORKOUTS(state, workouts) {
        state.workouts = workouts;
    },
    SET_ERRORS(state, errors) {
        state.errors = errors;
    },
    SET_PAGINATOR(state, paginator) {
        state.paginator = paginator;
    },
    UPDATE_WORKOUT(state, workout) {
        state.workouts = state.workouts.map((e) =>
            e.id === workout.id ? workout : e
        );
    },
};

const actions = {
    async fetchAll({ commit }, { page, search}) {
        try {
            commit('SET_IS_LOADING', true);
            const response = await api.workouts.all(page, search);
            commit('SET_WORKOUTS', response.data.data);
            commit('SET_PAGINATOR', {
                currentPage: response.data.meta.current_page,
                lastPage: response.data.meta.last_page,
                total: response.data.meta.total,
                perPage: response.data.meta.per_page,
            });
            return response.data.data;
        } catch (e) {
            this._vm.$toast.error('Failed to fetch workouts.');
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
            this._vm.$toast.error('Failed to fetch a workout.');
            return Promise.reject(e);
        } finally {
            commit('SET_IS_LOADING', false);
        }
    },
    async create({ state, dispatch, commit }, workout) {
        try {
            await api.workouts.create(workout);
            dispatch('fetchAll', state.paginator.currentPage );
            this._vm.$toast.success('Workout created.');
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
            this._vm.$toast.success('Workout updated.');
        } catch (e) {
            commit('SET_ERRORS', e.response.data.error);
            return Promise.reject(e);
        }
    },
    async delete({ state, dispatch }, id) {
        try {
            await api.workouts.destroy(id);
            dispatch('fetchAll', state.paginator.currentPage );
            this._vm.$toast.success('Workout deleted.');
        } catch (e) {
            this._vm.$toast.error('Failed to delete a workout.');
            return Promise.reject(e);
        }
    },
    async assignExercises({ commit }, { id, exercises} ) {
        try {
            await api.workouts.assignExercises(id, exercises);
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