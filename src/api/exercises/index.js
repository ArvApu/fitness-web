import request from './../request';

const resource = 'exercises';

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
    }
};