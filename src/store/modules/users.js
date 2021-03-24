import api from "@/api";

const state = {
    users: [],
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
    SET_USERS(state, users) {
        state.users = users;
    },
    SET_PAGINATOR(state, paginator) {
        state.paginator = paginator;
    },
    SET_IS_LOADING(state, status) {
        state.isLoading = status;
    },
    SET_ERRORS(state, errors) {
        state.errors = errors;
    },
    UPDATE_USER(state, user) {
        state.users = state.users.map((e) =>
            e.id === user.id ? user : e
        );
    },
};

const actions = {
    async fetchAll({ commit }, {page, search}) {
        try {
            const response = await api.users.get(page, search);
            commit('SET_USERS', response.data.data);
            commit('SET_PAGINATOR', {
                currentPage: response.data.meta.current_page,
                lastPage: response.data.meta.last_page,
                total: response.data.meta.total,
                perPage: response.data.meta.per_page,
            });
        } catch (e) {
            this._vm.$toast.error('Failed to fetch users.');
            return Promise.reject(e);
        }
    },
    async invite({ commit }, email) {
        try {
            commit('SET_IS_LOADING', true);
            await api.users.invite(email);
            this._vm.$toast.success('Invitation sent.');
        } catch (e) {
            commit('SET_ERRORS', e.response.data.error);
            return Promise.reject(e);
        } finally {
            commit('SET_IS_LOADING', false);
        }
    },
    async confirmInvite({ commit }, token) {
        try {
            await api.users.confirmInvite(token);
        } catch (e) {
            commit('SET_ERRORS', e.response.data.error);
            return Promise.reject(e);
        }
    },
    async update({ commit }, user) {
        try {
            const response = await api.users.update(user.id, {email: user.email});
            commit('UPDATE_USER', response.data);
            this._vm.$toast.success('User information updated.');
        } catch (e) {
            commit('SET_ERRORS', e.response.data.error);
            return Promise.reject(e);
        }
    },
    async delete({ state, dispatch }, id) {
        try {
            await api.users.destroy(id);
            dispatch('fetchAll', state.paginator.currentPage );
            this._vm.$toast.success('User removed.');
        } catch (e) {
            this._vm.$toast.error('Failed to remove a user.');
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