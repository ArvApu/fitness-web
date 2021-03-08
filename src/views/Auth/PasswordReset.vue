<template>
  <div class="auth">

    <div class="auth-box">

      <h1>Reset password</h1>
      <form class="auth-form" v-show="!success" @submit.prevent="handle">

        <div class="form-group">
          <label for="email">Email</label>
          <input required class="form-input" v-model="email" id="email" type="email" name="email" placeholder="Email"/>
        </div>

        <button type="submit" :disabled='loading' class="flex-center form-input btn btn-primary">
          <loading-ring :show="loading"/>
          <span>Reset</span>
        </button>

        <div class="form-group auth-links">
          <router-link :to="{ name: 'Login' }"> Return back to login </router-link>
        </div>

      </form>

      <div v-show="success">

        <p>
          Email with password reset instruction was sent
        </p>

        <router-link class="flex-center form-input btn btn-primary" :to="{ name: 'Login' }"> Return back to login </router-link>

      </div>

    </div>

    <div class="auth-illustration"/>

  </div>
</template>

<script>

import api from '@/api';
import LoadingRing from "@/components/LoadingRing";

export default {
  name: 'PasswordReset',
  components: {
    LoadingRing
  },
  data() {
    return {
      email: null,
      loading: false,
      success: false,
    };
  },
  methods: {
    handle() {
      this.loading = true;
      api.password.reset(this.email)
          .then(() => this.success = true)
          .catch(/*  Extract errors */)
          .finally(() => this.loading = false);
    }
  }
};
</script>

<style scoped>
  @import '../../assets/css/auth.css';
</style>