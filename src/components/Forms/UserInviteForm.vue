<template>
  <form id='exercise-form' @submit.prevent="handle">

    <div class='form-group'>
      <label for="email"> Email </label>
      <input required class='form-input' type="email" id="email" name="email" v-model="email">
    </div>

    <form-submit-button label="Invite" :processing="this.$store.state.users.isLoading"/>

  </form>
</template>

<script>

export default {
  name: 'UserInviteForm',
  data() {
    return {
      email: null,
    }
  },
  methods: {
    handle() {
      this.$store.dispatch('users/invite', this.email)
          .then(() => {
            this.$emit('invited')
          });
    },
  }
}
</script>