import request from './../request';

const resource = 'events';

export default {

    all(start, end) {
        return request.get(`${resource}`, {
            params: {
                start_date: start,
                end_date: end,
            }
        });
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