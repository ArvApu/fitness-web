import request from './../request';

export default {

    reset(email) {
        return request.post('password/reset', {
            email: email
        });
    },

    change(token ,password, confirmation) {
        return request.post(`password/reset/${token}`, {
            password: password,
            password_confirmation: confirmation,
        });
    },
};