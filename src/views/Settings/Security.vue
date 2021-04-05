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
        <input class="form-input" v-model="newPassword" id="new_password" type="password" placeholder="New password"/>
      </div>

      <div class="form-group">
        <label for="new_password_confirmation">Confirm new password</label>
        <input class="form-input" v-model="newPasswordConfirmation" id="new_password_confirmation" type="password" placeholder="Confirm new password"/>
      </div>

      <form-submit-button label="Submit" :processing="isLoading"/>
    </form>
  </div>

</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: 'Security',
  data() {
    return {
      isLoading: false,
      password: null,
      newPassword:null,
      newPasswordConfirmation: null,
    }
  },
  computed: {
    ...mapState('profile',[
      'errors'
    ]),
  },
  methods: {
    ...mapActions('profile',[
      'changePassword', 'clearErrors'
    ]),
    handle() {
      this.isLoading = true;
      this.changePassword({
        password: this.password,
        new_password: this.newPassword,
        new_password_confirmation: this.newPasswordConfirmation,
      }).then(() => {
        this.password = null;
        this.newPassword = null;
        this.newPasswordConfirmation = null;
        this.clearErrors();
      }).finally(() => {
        this.isLoading = false;
      });
    },
  },
  beforeRouteLeave (to, from, next) {
    this.clearErrors();
    next();
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