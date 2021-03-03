import request from './../request';

export default {

    login(credentials) {
        return request.post('login', credentials);
    },

    logout() {
        return request.post('logout');
    },

    refresh() {
        return request.post('refresh');
    },

    me() {
        return request.get('me');
    }
};