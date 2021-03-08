<template>
  <div class="container col-md-6 mt-5">
    <form name="form" @submit.prevent="handle">


      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="password" id="password" type="password" name="password" placeholder="Password"/>
      </div>

      <div class="form-group">
        <label for="password_confirmation">Confirm password</label>
        <input v-model="password_confirmation" id="password_confirmation" type="password"  name="password_confirmation" placeholder="Confirm password"/>
      </div>

      <div class="form-group">
        <button class="btn btn-primary btn-block" :disabled="loading">
          <span v-show="loading" class="spinner-border spinner-border-sm mr-2"></span>
          <span>Change</span>
        </button>
      </div>

    </form>
  </div>
</template>

<script>
import api from '@/api';

export default {
  name: 'PasswordChange',
  data() {
    return {
      password: null,
      password_confirmation: null,
    };
  },
  methods: {
    handle() {
      api.password.change(
          this.$route.params.token,
          this.password,
          this.password_confirmation
      ).then(
          () => this.$router.push({ name: 'Login'})
      ).catch(
          () => console.log('error')
      );
    }
  }
};
</script>