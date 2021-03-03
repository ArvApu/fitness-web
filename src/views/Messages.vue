<template>
  <div>

    {{ messages }}

    <input v-model="message" type="text">
    <button v-on:click="submit"> Send message </button>

  </div>
</template>

<script>

import { mapState, mapActions} from 'vuex';

export default {
  name: 'Messages',
  data() {
    return {
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
      'fetchAll', 'send'
    ]),
    submit() {
      this.send({
        userId: 3,
        message: this.message
      })
    }
  },
  created() {
    this.fetchAll(3)
  }
}
</script>