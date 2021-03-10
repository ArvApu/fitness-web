<template>
  <div class="auth">

    <div class="auth-box">

      <h1>Sign up</h1>

      <form class="auth-form" v-show="!success" @submit.prevent="register">

        <alerts :errors="errors"/>

        <div class="form-group">
          <label for="first_name">First name</label>
          <input required class="form-input" v-model="user.first_name" id="first_name" type="text" placeholder="First name"/>
        </div>

        <div class="form-group">
          <label for="last_name">Last name</label>
          <input required class="form-input" v-model="user.last_name" id="last_name" type="text" placeholder="Last name"/>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input required class="form-input" v-model="user.email" id="email" type="email" placeholder="Email"/>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input required class="form-input" v-model="user.password" id="password" type="password" placeholder="Password"/>
        </div>

        <div class="form-group">
          <label for="password_confirmation">Confirm password</label>
          <input required class="form-input" v-model="user.password_confirmation" id="password_confirmation" type="password" placeholder="Confirm password"/>
        </div>

        <form-submit-button label="Register" :processing="loading"/>

        <div class="form-group auth-links">
          <router-link :to="{ name: 'Login' }"> Return back to login </router-link>
        </div>

      </form>

      <div v-show="success">

        <p>
          User account created. Please login.
        </p>

        <router-link class="form-input btn btn-primary" :to="{ name: 'Login' }"> Go to login page </router-link>

      </div>

    </div>

    <div class="auth-illustration"/>

  </div>
</template>

<script>

import api from '@/api'

export default {
  name: 'Register',
  data() {
    return {
      user: {
        first_name: null,
        last_name: null,
        email : null,
        password: null,
        password_confirmation: null,
      },
      loading: false,
      success: false,
      errors: null,
    }
  },
  methods: {
    register() {
      this.loading = true

      api.registration.register(this.user)
          .then(() => this.success = true)
          .catch(err => this.errors = err.response.data.error)
          .finally(() => this.loading = false);
    },
  }
}
</script>

<style scoped>
  @import '../../assets/css/auth.css';
</style>