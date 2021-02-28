import request from './../request';

export default {

    register(payload) {
        return request.post('register', payload);
    }

};