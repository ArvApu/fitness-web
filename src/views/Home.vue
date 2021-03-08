<template>
  <div id="home">
    <header id="header">

      <!--      <div class='logo'>-->
      <!--        <img class='image' src='@/assets/logo.png' alt="">-->
      <!--      </div>-->

      <div class='buttons' v-if="isAuthenticated">
        <button class='btn' @click="logout()"> LOGOUT </button>
      </div>

    </header>

    <!-- MAIN -->
    <div id="main">

      <nav id="menu" v-if="isAuthenticated">
        <NavLinks/>
      </nav>

      <div id="content">
        <router-view/>
      </div>

    </div>
  </div>
</template>

<script>
import NavLinks from "@/components/NavLinks";

export default {
  name: 'Home',
  computed: {
    isAuthenticated () {
      return !!this.$store.state.auth.accessToken
    }
  },
  components: {
    NavLinks
  },
  methods: {
    logout() {
      this.isAuthenticated = false;
      this.$store.dispatch('auth/logout').finally(() =>
          this.$router.push({ name: 'Login' })
      );
    }
  }
}
</script>
