<template>
  <form id='exercise-form' @submit.prevent="handle">

    <div class='form-group'>
      <label for="email"> Email </label>
      <input required class='form-input' type="email" id="email" name="email" v-model="email">
    </div>



    <input class='form-input btn btn-primary' type="submit" id="add-comment" name="add-comment" value="Submit">

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