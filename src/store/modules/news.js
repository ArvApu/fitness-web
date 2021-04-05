import api from "@/api";

const state = {
    news: [],
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
    SET_NEWS(state, news) {
        state.news = news;
    },
    ADD_NEWS(state, news) {
        state.news.push(...news);
    },
    SET_PAGINATOR(state, paginator) {
        state.paginator = paginator;
    },
};

const actions = {
    async fetchAll({ commit }, {page, add}) {
        try {
            commit('SET_IS_LOADING', true);
            const response = await api.news.all(page);

            if(!add) {
                commit('SET_NEWS', response.data.data);
            } else {
                commit('ADD_NEWS', response.data.data);
            }

            commit('SET_PAGINATOR', {
                currentPage: response.data.meta.current_page,
                lastPage: response.data.meta.last_page,
                total: response.data.meta.total,
                perPage: response.data.meta.per_page,
            });
            return response.data.data;
        } catch (e) {
            this._vm.$toast.error('Failed to fetch news.');
            return Promise.reject(e);
        } finally {
            commit('SET_IS_LOADING', false);
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