<template>
  <div class="auth">

    <div class="auth-box">

      <h1>Email verification</h1>

      <div>
        <p v-if="error">
          <b style="color: var(--danger-color)">Verification failed:</b> {{ error }}
        </p>
        <p v-else>
          Email was successfully verified.
        </p>
        <router-link class="form-input btn btn-primary" :to="{ name: 'Login' }"> OK  </router-link>
      </div>

    </div>

    <div class="auth-illustration"/>

  </div>
</template>

<script>

import api from '@/api';

export default {
  name: 'VerifyEmail',
  data() {
    return {
      token: this.$route.params.token,
      error: null,
    };
  },
  created() {
    api.email.verify(this.token).catch(
        err => this.error = err.response.data.error[0]
    );
  }
};
</script>

<style scoped lang="css" src="../../assets/css/auth.css"/>