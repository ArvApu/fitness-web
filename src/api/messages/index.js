import request from './../request';

const resource = 'messages';

export default {

    getSent(to) {
        return request.get(`${resource}/sent/${to}`);
    },

    getReceived(from) {
        return request.get(`${resource}/received/${from}`);
    },

    send(to, message) {
        return request.post(`${resource}/${to}`, {message: message});
    },
};