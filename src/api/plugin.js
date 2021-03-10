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
        let   message = error.response.data.error;

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
                let validationErrors = error.response.data;

                let errors = [];

                for (const key in validationErrors) {
                    if (!Object.prototype.hasOwnProperty.call(validationErrors, key)) {
                        continue;
                    }
                    errors = [...errors, ...validationErrors[key]];
                }

                message = errors;
                break;
            }
            default: {
                console.error(status, message);
                break;
            }
        }

        error.response.data.error = (Array.isArray(message)) ? message : [message];

        return Promise.reject(error);
    });
};

const plugin = (store) => {
    createRequestInterceptor(store);
    createResponseInterceptor(store);
};

export default plugin;