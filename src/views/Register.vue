<template>
  <div>

    <h1>Sign in</h1>

    <form class="register" @submit.prevent="register">

      <hr>
      <label>First name</label>
      <input required v-model="user.first_name" type="text" placeholder="First name"/>

      <label>Last name</label>
      <input required v-model="user.last_name" type="text" placeholder="Last name"/>

      <label>Email</label>
      <input required v-model="user.email" type="email" placeholder="Email"/>

      <label>Password</label>
      <input required v-model="user.password" type="password" placeholder="Password"/>

      <label>Confirm password</label>
      <input required v-model="user.password_confirmation" type="password" placeholder="Confimr password"/>

      <hr>
      <button type="submit">Register</button>
    </form>

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
        password_confirmation: null
      }
    }
  },
  methods: {
    register() {
      api.registration.register(this.user)
          .then(() => this.$router.push('/login'))
          .catch(err => console.log(err));
    },
  }
}
</script>