<template>
  <div>

    <chat-window
        :height="'920px'"
        :current-user-id="currentUserId"
        :rooms="rooms"
        :messages="messages"
        :rooms-loaded="true"
        :messages-loaded="messagesLoaded"
        :show-files="false"
        :show-audio="false"
        :show-add-room="false"
        :show-reaction-emojis="false"
        @fetch-messages="handleMessages"
        @fetch-more-rooms="handleRooms"
        @send-message="handleMessageSend"
    />

  </div>
</template>

<script>

import { mapState, mapActions} from 'vuex';
import Pusher from 'pusher-js';

import ChatWindow from 'vue-advanced-chat'
import 'vue-advanced-chat/dist/vue-advanced-chat.css'

export default {
  name: 'Messages',
  components: {
    ChatWindow
  },
  data() {
    return {
      currentUserId: this.$store.state.auth.user.id,
      userId: null,
      messagesLoaded: false,
    }
  },
  computed: {
    ...mapState('messages', [
      'messages', 'rooms'
    ])
  },
  methods: {
    ...mapActions('messages', [
      'fetchAll', 'send', 'receive', 'loadRooms'
    ]),
    handleMessageSend({ content }) {
      this.send({
        userId: this.userId,
        message: content
      })
    },
    handleRooms() {
      // TODO: load more rooms
    },
    handleMessages({room}){
      this.messagesLoaded = false;
      this.userId = room.users.find(user => user._id !== this.currentUserId)._id;
      this.fetchAll(this.userId).then(() => this.messagesLoaded = true);
    }
  },
  mounted() {
    const pusher = new Pusher(process.env.VUE_APP_PUSHER_API_KEY, {
      authEndpoint: `${process.env.VUE_APP_API_URL}/broadcasting/auth`,
      auth: {
        headers: {
          'Authorization': `Bearer ${this.$store.state.auth.accessToken}`
        }
      },
      cluster: process.env.VUE_APP_PUSHER_CLUSTER ?? 'eu',
    });

    const channel = pusher.subscribe(`private-user.${this.currentUserId}`);

    const self = this;

    channel.bind('send.message', function (data) {
      if(data.message.sender_id !== self.currentUserId) {
        self.receive(data.message);
      }
    });
  },
  created() {
    this.loadRooms();
  }
}
</script>