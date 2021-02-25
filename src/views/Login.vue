<template>
  <div>
    <form class="login" @submit.prevent="login">

      <h1>Sign in</h1>
      <label>Email</label>
      <input required v-model="email" type="email" placeholder="Name"/>

      <label>Password</label>
      <input required v-model="password" type="password" placeholder="Password"/>

      <hr/>

      <button type="submit">Login</button>
    </form>

    <!-- TODO: Temporary -->
    <br>
    <hr>
    {{ accessToken }}
    <br>
    <hr>
    {{ expiryTime }}


  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  data() {
    return {
      email : null,
      password: null
    }
  },
  computed: {
    ...mapState('auth', ['accessToken', 'expiryTime']),
  },
  methods: {
    login() {
      let email = this.email;
      let password = this.password;

      this.$store.dispatch('auth/login', { email, password })
          .then(() => this.$router.push('/login'))
          .catch(err => console.log(err));
    },
  }
}
</script>