import request from './../request';

const resource = 'events';

export default {

    all(userId, start, end) {
        return request.get(`${resource}`, {
            params: {
                user_id: userId,
                start_date: start,
                end_date: end,
            }
        });
    },

    single(id, userId) {
        return request.get(`${resource}/${id}`,{
            params: {
                user_id: userId,
            }
        });
    },

    export(userId) {
        return request.get(`${resource}/export`, {
            params: {
                user_id: userId
            },
            responseType: 'blob',
        });
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