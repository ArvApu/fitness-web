<template>
  <header id="header">

    <div class='logo'>

    </div>

    <div class='account'>

      <transition name="fade">
        <ul class="profile-links" v-if="active">
          <router-link :to="{name: 'Home'}"> Home </router-link>
          <router-link :to="{name: 'Settings'}"> Settings </router-link>
          <a href="#" @click="logout()"> Logout </a>
        </ul>
      </transition>


      <button class='btn' @click="toggle()"> <font-awesome-icon icon="user"/> </button>
    </div>

  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {
      active: false
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout').finally(() =>
          this.$router.push({ name: 'Login' })
      );
    },
    toggle() {
      this.active = !this.active
    }
  }
}
</script>

<style scoped>

/* Classes used for <transition> */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>