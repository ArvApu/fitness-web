import request from './../request';

const resource = 'days';

export default {

    all() {
        return request.get(`${resource}`);
    },

    single(id) {
        return request.get(`${resource}/${id}`);
    },

    create(payload) {
        return request.post(`${resource}`, payload);
    },

    update(id, payload) {
        return request.put(`${resource}/${id}`, payload);
    },

    destroy(id) {
        return request.delete(`${resource}/${id}`);
    }
};