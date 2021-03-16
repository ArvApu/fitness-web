import api from "@/api";

const state = {
    events: [],
    isLoading: false,
    errors: [],
};

const getters = {};

const mutations = {
    SET_IS_LOADING(state, isLoading) {
        state.isLoading = isLoading;
    },
    SET_EVENTS(state, events) {
        state.events = events;
    },
    SET_ERRORS(state, errors) {
        state.errors = errors;
    },
    ADD_EVENT(state, event) {
        state.events.unshift(event);
    },
    UPDATE_EVENT(state, event) {
        state.events = state.events.map((e) =>
            e.id === event.id ? event : e
        );
    },
    DELETE_EVENT(state, id) {
        console.log(id)
        state.events = state.events.filter((e) => e.id !== id);
    },
};

const actions = {
    async fetchAll({ commit }, {userId, start, end}) {
        try {
            commit('SET_IS_LOADING', true);
            const response = await api.events.all(userId, start, end);
            commit('SET_EVENTS', response.data);
        } catch (e) {
            commit('SET_ERRORS', e.response.data.error);
            return Promise.reject(e);
        } finally {
            commit('SET_IS_LOADING', false);
        }
    },
    async fetchOne({ commit }, {id, userId}) {
        try {
            commit('SET_IS_LOADING', true);
            const response = await api.events.single(id, userId);
            return response.data ?? null;
        } catch (e) {
            commit('SET_ERRORS', e.response.data.error);
            return Promise.reject(e);
        } finally {
            commit('SET_IS_LOADING', false);
        }
    },
    async create({ commit }, data) {
        try {
            const response = await api.events.create(data);
            if (response && response.data && response.status === 201) {
                commit('ADD_EVENT', response.data);
            }
            return {
                id: response.data.id,
                title: response.data.title,
                start: response.data.start_time,
                end: response.data.end_time,
            }
        } catch (e) {
            commit('SET_ERRORS', e.response.data.error);
            return Promise.reject(e);
        }
    },
    async update({ commit }, event) {
        try {
            const response = await api.events.update(event.id, event);
            if (response && response.data && response.status === 200) {
                commit('UPDATE_EVENT', response.data);
            }
        } catch (e) {
            commit('SET_ERRORS', e.response.data.error);
            return Promise.reject(e);
        }
    },
    async delete({ commit }, id) {
        try {
            const response = await api.events.destroy(id);
            if (response && response.status === 204) {
                commit('DELETE_EVENT', parseInt(id));
            }
        } catch (e) {
            commit('SET_ERRORS', e.response.data.error);
            return Promise.reject(e);
        }
    },
    async export({ commit }, userId) {
        try {
            const response = await api.events.export(userId);

            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement('a');

            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'calendar.ical');
            document.body.appendChild(fileLink);

            fileLink.click();
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