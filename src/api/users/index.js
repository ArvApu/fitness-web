import request from './../request';

export default {

    get(page, search) {
        if(search) {
            return request.get('users?page='+page+'&q='+search);
        }
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

    update(id, payload) {
        return request.put(`users/${id}`, payload);
    },

    destroy(id) {
        return request.delete(`users/${id}`);
    },
};