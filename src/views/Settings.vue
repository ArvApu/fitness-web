<template>
  <div id="home">

    <app-header links="settings"/>

    <!-- MAIN -->
    <div id="main">

      <nav id="menu">
        <settings-menu-links/>
      </nav>

      <div id="content">
        <router-view/>
      </div>

    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import SettingsMenuLinks from "@/components/MenuLinks/SettingsMenuLinks";

export default {
  name: 'Settings',
  components: {
    SettingsMenuLinks,
    AppHeader
  },
}
</script>
