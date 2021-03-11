import request from './../request';

export default {

    verify(token) {
        return request.post(`/email/verify/${token}`);
    },

};