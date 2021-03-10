<template>
  <form id='user-invite-form' @submit.prevent="handle">

    <alerts :errors="errors"/>

    <div class='form-group'>
      <label for="email"> Email </label>
      <input required class='form-input' type="email" id="email" name="email" v-model="email">
    </div>

    <form-submit-button label="Invite" :processing="this.$store.state.users.isLoading"/>

  </form>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: 'UserInviteForm',
  data() {
    return {
      email: null,
    }
  },
  computed: {
    ...mapState('users', [
      'errors'
    ])
  },
  methods: {
    handle() {
      this.$store.dispatch('users/invite', this.email)
          .then(() => {
            this.$emit('invited')
          });
    }
  },
  created() {
    this.$store.dispatch('users/clearErrors')
  }
}
</script>