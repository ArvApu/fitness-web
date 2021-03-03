import request from './../request';

const resource = 'messages';

export default {

    getByUser(id) {
        return request.get(`${resource}/${id}`);
    },

    send(to, message) {
        return request.post(`${resource}/${to}`, {message: message});
    },
};