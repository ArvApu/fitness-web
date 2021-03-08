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

        <button type="submit" class="form-input btn btn-primary">Login</button>

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

export default {
  name: 'Login',
  data() {
    return {
      email : null,
      password: null
    }
  },
  methods: {
    login() {
      let email = this.email;
      let password = this.password;

      this.$store.dispatch('auth/login', { email, password })
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err));
    },
  }
}
</script>

<style scoped>
  @import '../../assets/css/login.css';
</style>