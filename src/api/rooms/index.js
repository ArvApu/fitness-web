import request from './../request';

const resource = 'rooms';

export default {

    all() {
        return request.get(`${resource}`);
    },

    messages(id) {
        return request.get(`${resource}/${id}/messages`);
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