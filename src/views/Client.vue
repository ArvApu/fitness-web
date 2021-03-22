<template>
  <div id="home">

    <app-header links="client"/>

    <!-- MAIN -->
    <div id="main">

      <nav id="menu">
        <client-menu-links :user-id="this.$route.params.userId"/>
      </nav>

      <div id="content">
        <router-view/>
      </div>

    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import ClientMenuLinks from "@/components/MenuLinks/ClientMenuLinks";

export default {
  name: 'Client',
  components: {
    ClientMenuLinks,
    AppHeader
  }
}
</script>
