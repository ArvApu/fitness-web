<template>
  <form id='room-create-form' @submit.prevent="handle">

    <alerts :errors="errors"/>

    <div class='form-group'>
      <label for="name"> Name </label>
      <input required class='form-input' type="text" id="name" name="name" v-model="name">
    </div>

    <div class='form-group'>
      <label for="user"> User </label>
      <input required class='form-input' type="number" id="user" name="user" v-model="user">
    </div>

    <form-submit-button label="Add room" :processing="this.$store.state.users.isLoading"/>

  </form>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: 'RoomForm',
  data() {
    return {
      name: null,
      user: null,
    }
  },
  computed: {
    ...mapState('rooms', [
      'errors'
    ])
  },
  methods: {
    handle() {
      this.$store.dispatch('rooms/create', {
        name: this.name,
        users: [
          this.user // TODO: select users from list
        ]
      }).then(() => {
        this.$emit('created')
      });
    }
  },
  created() {
    this.$store.dispatch('rooms/clearErrors')
  }
}
</script>