import request from './../request';

const resource = 'rooms';

export default {

    all(page) {
        return request.get(`${resource}?page=${page}`);
    },

    messages(id, page) {
        return request.get(`${resource}/${id}/messages?page=${page}`);
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