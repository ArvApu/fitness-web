import request from './../request';

const resource = 'workouts';

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
    },

    assignExercises(id, exercises) {
        return request.post(`${resource}/${id}/exercises`, {
            exercises: exercises
        });
    },
};