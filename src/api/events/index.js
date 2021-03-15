import request from './../request';

const resource = 'events';

export default {

    all() {
        return request.get(`${resource}`);
    },

    single(id) {
        return request.get(`${resource}/${id}`);
    },

    export() {
        return request.get(`${resource}/export`);
    },

    create(payload) {
        return request.post(`${resource}`, payload);
    },

    update(id, payload) {
        return request.put(`${resource}/${id}`, payload);
    },

    destroy(id) {
        return request.delete(`${resource}/${id}`);
    },
};