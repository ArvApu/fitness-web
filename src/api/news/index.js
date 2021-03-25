import request from './../request';

const resource = 'news';

export default {

    all(page) {
        return request.get(`${resource}?page=${page}`);
    },

};