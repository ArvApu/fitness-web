<template>
  <div>

    {{ messages }}

    <input v-model="message" type="text">
    <button v-on:click="submit"> Send message </button>

  </div>
</template>

<script>

import { mapState, mapActions} from 'vuex';
import Pusher from 'pusher-js';

export default {
  name: 'Messages',
  data() {
    return {
      userId: 3, // TODO: load dynamically, this is of user whose chat is active
      message: null,
    }
  },
  computed: {
    ...mapState('messages', [
      'messages'
    ])
  },
  methods: {
    ...mapActions('messages', [
      'fetchAll', 'send', 'receive'
    ]),
    submit() {
      this.send({
        userId: this.userId,
        message: this.message
      })
    }
  },
  mounted() {
    const pusher = new Pusher(process.env.VUE_APP_PUSHER_API_KEY, {
      cluster: process.env.VUE_APP_PUSHER_CLUSTER ?? 'eu',
    });

    const channel = pusher.subscribe('testing');

    const self = this;

    channel.bind('message-sent', function (data) {
      self.receive(data.message);
    });
  },
  created() {
    this.fetchAll(this.userId)
  }
}
</script>