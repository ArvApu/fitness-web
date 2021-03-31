<template>
  <form id='user-invite-form' @submit.prevent="handle">

    <alerts :errors="errors"/>

    <div class='form-group'>
      <label for="email"> Email </label>
      <input required class='form-input' type="email" id="email" name="email" v-model="email">
    </div>

    <form-submit-button label="Invite" :processing="isLoading"/>

  </form>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: 'UserInviteForm',
  data() {
    return {
      email: null,
      isLoading: false,
    }
  },
  computed: {
    ...mapState('users', [
      'errors'
    ])
  },
  methods: {
    handle() {
      this.isLoading = true;
      this.$store.dispatch('users/invite', this.email)
          .then(() => {
            this.$emit('invited')
          })
          .finally(() => {
            this.isLoading = false;
          });
    }
  },
  created() {
    this.$store.dispatch('users/clearErrors')
  }
}
</script>