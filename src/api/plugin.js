import request from './request';

const createRequestInterceptor = (store) => {
    request.interceptors.request.use(function(config) {
        const token = store.state.auth.accessToken;

        if (token != null) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    }, null);
};

const createResponseInterceptor = (store) => {
    request.interceptors.response.use(null, async (error) => {
        const status  = error.response.status;
        const message = error.response.data.error;

        switch (status) {
            case 401: {
                let shouldRefresh = !store.state.auth.refreshFailed;

                if(shouldRefresh) {
                    store.dispatch('auth/refresh');
                    break;
                }

                store.dispatch('auth/clearSession');
                break;
            }
            case 422: {
                // error = extractErrors(error.response.data); TODO
                break;
            }
            default: {
                console.error(status, message);
                break;
            }
        }

        return Promise.reject(error);
    });
};

const plugin = (store) => {
    createRequestInterceptor(store);
    createResponseInterceptor(store);
};

export default plugin;