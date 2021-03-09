<template>
  <div id="home">
    <header id="header">

      <!--      <div class='logo'>-->
      <!--        <img class='image' src='@/assets/logo.png' alt="">-->
      <!--      </div>-->

      <div class='buttons'>
        <button class='btn' @click="logout()"> LOGOUT </button>
      </div>

    </header>

    <!-- MAIN -->
    <div id="main">

      <nav id="menu">
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
  components: {
    NavLinks
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout').finally(() =>
          this.$router.push({ name: 'Login' })
      );
    }
  }
}
</script>
