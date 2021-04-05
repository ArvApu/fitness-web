<template>
  <div class="auth">

    <div class="auth-box">

      <h1>User invitation</h1>

      <div>
        <p v-if="error">
          <b style="color: var(--danger-color)">Invitation failed:</b> {{ error }}
        </p>
        <p v-else>
          Your invitation was confirmed.
        </p>
        <router-link class="form-input btn btn-primary" :to="{ name: 'Login' }"> OK </router-link>
      </div>

    </div>

    <div class="auth-illustration"/>

  </div>
</template>

<script>

import api from '@/api';

export default {
  name: 'InviteUser',
  data() {
    return {
      token: this.$route.params.token,
      error: null,
    };
  },
  created() {
    api.users.confirmInvite(this.token).catch(
        err => this.error = err.response.data.error[0]
    );
  }
};
</script>

<style scoped lang="css" src="../../assets/css/auth.css"/>