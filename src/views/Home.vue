<template>
  <div id="home">

    <app-header/>

    <!-- MAIN -->
    <div id="main">

      <nav id="menu">
        <menu-links/>
      </nav>

      <div id="content">
        <router-view/>
      </div>

    </div>
  </div>
</template>

<script>
import MenuLinks from "@/components/MenuLinks/MenuLinks";
import AppHeader from "@/components/AppHeader";

export default {
  name: 'Home',
  components: {
    MenuLinks,
    AppHeader
  },
}
</script>
