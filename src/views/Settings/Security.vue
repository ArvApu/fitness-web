<template>

  <div class="security">

    <alerts :errors="errors"/>

    <form id='security-form' @submit.prevent="handle" autocomplete="off">

      <h2> Security information </h2>

      <div class="form-group">
        <label for="password">Password</label>
        <input class="form-input" v-model="password" id="password" type="password" placeholder="Password"/>
      </div>

      <div class="form-group">
        <label for="new_password">New password</label>
        <input class="form-input" v-model="new_password" id="new_password" type="password" placeholder="New password"/>
      </div>

      <div class="form-group">
        <label for="new_password_confirmation">Confirm new password</label>
        <input class="form-input" v-model="new_password_confirmation" id="new_password_confirmation" type="password" placeholder="Confirm new password"/>
      </div>

      <form-submit-button label="Submit"/>
    </form>
  </div>

</template>

<script>
export default {
  name: 'Security',
  data() {
    return {
      password: null,
      new_password:null,
      new_password_confirmation: null,
    }
  },
  methods: {
    handle() {

    }
  }
}
</script>

<style scoped>
.security {
  margin: 0 80px;
}

@media only screen and (max-width: 500px) {
  .security {
    margin: 0;
  }
}
</style>