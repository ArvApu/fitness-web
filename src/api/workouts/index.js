import request from './../request';

const resource = 'workouts';

export default {

    all(page, search) {
        if(search) {
            return request.get(`${resource}?page=${page}&q=${search}`);
        }
        return request.get(`${resource}?page=${page}`);
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

    copy(id) {
        return request.post(`${resource}/${id}/copy`);
    },

    reassignExercises(id, assigned, payload) {
        return request.put(`${resource}/${id}/exercises/${assigned}`, payload);
    },

    unassignExercises(id, assigned) {
        return request.delete(`${resource}/${id}/exercises/${assigned}`);
    },
};