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
        :show-new-messages-divider="false"
        @fetch-messages="handleMessages"
        @fetch-more-rooms="handleRooms"
        @send-message="handleMessageSend"
    />

  </div>
</template>

<script>

import { mapState, mapActions} from 'vuex';

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
      'messages',
    ]),
    ...mapState('rooms', [
      'rooms',
    ]),
  },
  methods: {
    ...mapActions('messages', [
      'fetchAll', 'send'
    ]),
    ...mapActions('rooms', {
      fetchRooms: 'fetchAll'
    }),
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
    // TODO: remove
  },
  created() {
    this.fetchRooms();
  }
}
</script>