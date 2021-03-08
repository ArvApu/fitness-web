<template>
  <div class="auth">

    <div class="auth-box">

      <h1>Set new password</h1>

      <form class="auth-form" v-show="!success" @submit.prevent="handle">

        <div class="form-group">
          <label for="password">Password</label>
          <input required class="form-input" v-model="password" id="password" type="password" name="password" placeholder="Password"/>
        </div>

        <div class="form-group">
          <label for="password_confirmation">Confirm password</label>
          <input required class="form-input" v-model="password_confirmation" id="password_confirmation" type="password"  name="password_confirmation" placeholder="Confirm password"/>
        </div>

        <button type="submit" :disabled='loading' class="flex-center form-input btn btn-primary">
          <loading-ring :show="loading"/>
          <span>Reset</span>
        </button>


      </form>

      <div v-show="success">

        <p>
          Password was successfully changed. Now you can log in.
        </p>

        <router-link class="flex-center form-input btn btn-primary" :to="{ name: 'Login' }"> Go to login page </router-link>

      </div>

    </div>

    <div class="auth-illustration"/>

  </div>
</template>

<script>

import api from '@/api';
import LoadingRing from "@/components/LoadingRing";

export default {
  name: 'PasswordChange',
  components: {
    LoadingRing
  },
  data() {
    return {
      password: null,
      password_confirmation: null,
      loading: false,
      success: false,
    };
  },
  methods: {
    handle() {
      this.loading = true;

      api.password.change(
          this.$route.params.token,
          this.password,
          this.password_confirmation
      ).then(
          () => this.success = true
      ).catch(
          () => console.log('error') // TODO: exctract error
      ).finally(
          () => this.loading = false
      );
    }
  }
};
</script>

<style scoped>
  @import '../../assets/css/auth.css';
</style>