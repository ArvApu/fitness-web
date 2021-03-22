<template>
  <header id="header">

    <div class='logo'>
      <slide id='mobile-menu'>
        <client-menu-links v-if="this.links === 'client'"/>
        <settings-menu-links v-else-if="this.links === 'settings'"/>
        <menu-links v-else/>
      </slide>
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

import MenuLinks from '@/components/MenuLinks/MenuLinks.vue'
import ClientMenuLinks from '@/components/MenuLinks/ClientMenuLinks.vue'
import { Slide } from 'vue-burger-menu'
import SettingsMenuLinks from "@/components/MenuLinks/SettingsMenuLinks";

export default {
  name: 'AppHeader',
  components: {
    Slide,
    MenuLinks,
    ClientMenuLinks,
    SettingsMenuLinks,
  },
  props: {
    links: String
  },
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