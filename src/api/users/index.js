import request from './../request';

export default {

    get() {
        return request.get('users');
    },

};