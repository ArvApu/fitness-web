import request from './../request';

const resource = 'messages';

export default {

    send(to, message) {
        return request.post(`${resource}/${to}`, {message: message});
    },

};