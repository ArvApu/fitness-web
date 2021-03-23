import request from './../request';

export default {

    update(payload) {
        return request.put('profile', payload);
    },

    changePassword(payload) {
        return request.put('profile/password', payload);
    },

};