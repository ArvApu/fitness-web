<template>
  <div>

    <h1>Sign in</h1>

    <form class="login" @submit.prevent="login">
      <hr>
      <label>Email</label>
      <input required v-model="email" type="email" placeholder="Email"/>

      <label>Password</label>
      <input required v-model="password" type="password" placeholder="Password"/>

      <hr>
      <button type="submit">Login</button>

      <div class="form-group">
        <router-link :to="{ name: 'PasswordReset' }" > Remember password. </router-link>
        <router-link :to="{ name: 'Register' }" > Do not have an account? Register here. </router-link>
      </div>

    </form>

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