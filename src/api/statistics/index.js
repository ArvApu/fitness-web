import request from './../request';

const resource = 'statistics';

export default {

    workouts(userId) {
        return request.get(`${resource}/workouts`, {
            params: {
                user_id: userId,
            }
        });
    },

    workout(id, userId) {
        return request.get(`${resource}/workouts/${id}`, {
            params: {
                user_id: userId,
            }
        });
    },

    exercises(userId) {
        return request.get(`${resource}/exercises`, {
            params: {
                user_id: userId,
            }
        });
    },

    exercise(id, userId) {
        return request.get(`${resource}/exercises/${id}`, {
            params: {
                user_id: userId,
            }
        });
    },

    weight(userId) {
        return request.get(`${resource}/users/weight`, {
            params: {
                user_id: userId,
            }
        });
    },
};