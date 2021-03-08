<template>
  <div class="">

    <form name="form" @submit.prevent="handle">

      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" id="email" type="email" name="email" placeholder="Email"/>
      </div>

      <div class="form-group">
        <button class="btn btn-primary btn-block" :disabled="loading">
          <span v-show="loading" class="spinner-border spinner-border-sm mr-2"></span>
          <span>Reset</span>
        </button>
      </div>

      <div class="form-group">
        <router-link class="btn btn-secondary btn-block" :to="{ name: 'Login' }"> Return back to login </router-link>
      </div>

    </form>
  </div>
</template>

<script>
import api from '@/api';

export default {
  name: 'PasswordReset',
  data() {
    return {
      email: null,
    };
  },
  methods: {
    handle() {
      api.password.reset(this.email); // TODO: then -> show success message and replace input and button with back link
    }
  }
};
</script>