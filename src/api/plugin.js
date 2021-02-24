import request from './request';

const createRequestInterceptor = (store) => {
    request.interceptors.request.use(function(config) {
        const token = store.dispatch('getToken');

        if (token != null) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    }, null);
};

const createResponseInterceptor = (store) => {
    request.interceptors.response.use(null, async (error) => {
        const { status, data, message} = error.response;

        switch (status) {
            case 401:
                console.log(data);
                store.dispatch();
                // TODO: try to refresh token if fails then redirect to login (router.push('/login');)
                break;
            default:
                console.error(status, message);
                // error = extractErrors(error.response.data); TODO
        }
        return Promise.reject(error);
    });
};

const plugin = (store) => {
    createRequestInterceptor(store);
    createResponseInterceptor(store);
};

export default plugin;