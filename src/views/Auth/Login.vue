<template>
  <div id="login">

    <div class="login-box">

      <h1>Sign in</h1>

      <form class="login-form" @submit.prevent="login">

        <div class="form-group">
          <label for="email">Email</label>
          <input required class="form-input" v-model="email" id="email" type="email" placeholder="Email"/>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input required class="form-input" v-model="password" id="password" type="password" placeholder="Password"/>
        </div>

        <button type="submit" :disabled='loading' class="flex-center form-input btn btn-primary">
          <loading-ring :show="loading"/>
          <span>Login</span>
        </button>

        <div class="form-group links">
          <router-link :to="{ name: 'PasswordReset' }" > Remember password </router-link>
          <router-link :to="{ name: 'Register' }" > Do not have an account? </router-link>
        </div>

      </form>
    </div>

    <div class="login-illustration"/>

  </div>

</template>

<script>

import LoadingRing from "@/components/LoadingRing";

export default {
  name: 'Login',
  components: {
    LoadingRing
  },
  data() {
    return {
      email : null,
      password: null,
      loading: false,
    }
  },
  methods: {
    login() {
      this.loading = true;

      let email = this.email;
      let password = this.password;

      this.$store.dispatch('auth/login', { email, password })
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err))
          .finally(() => this.loading = false);
    },
  }
}
</script>

<style scoped>
  @import '../../assets/css/login.css';
</style>