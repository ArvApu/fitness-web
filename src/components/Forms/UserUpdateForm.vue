<template>
  <form id='user-invite-form' @submit.prevent="handle">

    <alerts :errors="errors"/>

    <div class='form-group'>
      <label for="email"> Email </label>
      <input required class='form-input' type="email" id="email" name="email" v-model="email">
    </div>

    <form-submit-button label="Update" :processing="this.$store.state.users.isLoading"/>

  </form>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: 'UserUpdateForm',
  props: {
    user: Object,
  },
  data() {
    return {
      id: this.user.id,
      email: this.user.email,
    }
  },
  computed: {
    ...mapState('users', [
      'errors'
    ])
  },
  methods: {
    handle() {
      this.$store.dispatch('users/update', {id: this.id, email: this.email})
        .then(() => {
          this.$emit('updated')
        });
    }
  },
  created() {
    this.$store.dispatch('users/clearErrors')
  }
}
</script>