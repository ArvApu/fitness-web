import request from './../request';

export default {

    get(page) {
        return request.get('users?page='+page);
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