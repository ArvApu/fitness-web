import request from './../request';

export default {

    get() {
        return request.get('users');
    },

    invite(email) {
        return request.post('users/invite', {
            email: email
        });
    },

    confirmInvite(token) {
        return request.post(`users/invite/${token}`);
    },

};