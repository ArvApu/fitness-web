import Pusher from 'pusher-js';

const plugin = (store) => {

    if(!store.state.auth.user) {
        return;
    }

    const pusher = new Pusher(process.env.VUE_APP_PUSHER_API_KEY, {
        cluster: process.env.VUE_APP_PUSHER_CLUSTER ?? 'eu',
        authEndpoint: `${process.env.VUE_APP_API_URL}/broadcasting/auth`,
        auth: {
            headers: {
                'Authorization': `Bearer ${store.state.auth.accessToken}`
            }
        },
    });

    const channel = pusher.subscribe(`private-user.${store.state.auth.user.id}`);

    channel.bind('send.message', function (data) {
        store.dispatch('messages/receive', data.message);
    });

    channel.bind('read.messages', function (data) {
        store.dispatch('messages/read', data.messages);
    });
};

export default plugin;