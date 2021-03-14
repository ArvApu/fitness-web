import request from '../request';

const resource = 'workouts/logs';

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

    destroy(id) {
        return request.delete(`${resource}/${id}`);
    },
};