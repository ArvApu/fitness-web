<template>
  <div class="auth">

    <div class="auth-box">

      <h1>Reset password</h1>

      <form class="auth-form" v-show="!success" @submit.prevent="handle">

        <alerts :errors="errors"/>

        <div class="form-group">
          <label for="email">Email</label>
          <input required class="form-input" v-model="email" id="email" type="email" name="email" placeholder="Email"/>
        </div>

        <form-submit-button label="Reset" :processing="loading"/>

        <div class="form-group auth-links">
          <router-link :to="{ name: 'Login' }"> Return back to login </router-link>
        </div>

      </form>

      <div v-show="success">

        <p>
          Email with password reset instruction was sent
        </p>

        <router-link class="form-input btn btn-primary" :to="{ name: 'Login' }"> Return back to login </router-link>

      </div>

    </div>

    <div class="auth-illustration"/>

  </div>
</template>

<script>

import api from '@/api';

export default {
  name: 'PasswordReset',
  data() {
    return {
      email: null,
      loading: false,
      success: false,
      errors: null,
    };
  },
  methods: {
    handle() {
      this.loading = true;
      api.password.reset(this.email)
          .then(() => this.success = true)
          .catch(err => this.errors = err.response.data.error)
          .finally(() => this.loading = false);
    }
  }
};
</script>

<style scoped lang="css" src="../../assets/css/auth.css"/>