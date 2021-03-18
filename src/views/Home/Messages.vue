<template>
  <div class="remove-content-paddings">

    <chat-window
        :height="'93.5vh'"
        :current-user-id="currentUserId"
        :rooms="rooms"
        :messages="messages"
        :rooms-loaded="true"
        :messages-loaded="messagesLoaded"
        :show-files="false"
        :show-audio="false"
        :show-add-room="canAddRoom"
        :show-reaction-emojis="false"
        :show-new-messages-divider="false"
        @fetch-messages="handleMessages"
        @fetch-more-rooms="handleRooms"
        @send-message="handleMessageSend"
        @add-room="show"
    />

    <modal class="force-scroll-modal" name="add-room-modal" :width=800 :height="'auto'" :adaptive=true :scrollable=true>
      <div class="modal-from">
        <room-form @created="hide"/>
      </div>
    </modal>

  </div>
</template>

<script>

import { mapState, mapActions} from 'vuex';

import ChatWindow from 'vue-advanced-chat'
import 'vue-advanced-chat/dist/vue-advanced-chat.css'
import RoomForm from '@/components/Forms/RoomForm';

export default {
  name: 'Messages',
  components: {
    ChatWindow,
    RoomForm,
  },
  data() {
    return {
      currentRoom: null,
      currentUserId: this.$store.state.auth.user.id,
      userId: null,
      messagesLoaded: false,
      canAddRoom: this.$store.state.auth.user.role !== 'user',
    }
  },
  computed: {
    ...mapState('messages', [
      'messages', 'paginator'
    ]),
    ...mapState('rooms', [
      'rooms',
    ]),
  },
  methods: {
    ...mapActions('messages', [
      'fetchAll', 'send', 'resetMessages'
    ]),
    ...mapActions('rooms', {
      fetchRooms: 'fetchAll'
    }),
    handleMessageSend({ roomId, content }) {
      this.send({
        roomId: roomId,
        message: content
      })
    },
    handleRooms() {
      this.fetchRooms(); // TODO: paginate
    },
    handleMessages({room, options}){
      this.messagesLoaded = false;
      if(options && options.reset) {
        this.resetMessages();
      }

      this.fetchAll({
        roomId: room.roomId,
        page: this.paginator.currentPage + 1
      }).finally(() => {
        this.messagesLoaded = this.paginator.currentPage >= this.paginator.lastPage;
      });
    },
    show () {
      this.$modal.show('add-room-modal');
    },
    hide () {
      this.$modal.hide('add-room-modal');
    },
  },
  created() {
    this.fetchRooms();
  }
}
</script>