<template>
  <ul>
    <li>
      <router-link :to="{ name: 'Account'}" exact-active-class="side-panel-exact-active" > <font-awesome-icon icon="user" fixed-width/> Account </router-link>
    </li>
    <li>
      <router-link :to="{ name: 'Security'}" exact-active-class="side-panel-exact-active" > <font-awesome-icon icon="shield-alt" fixed-width/> Security </router-link>
    </li>
  </ul>
</template>
<script>

export default {
  name: 'SettingsMenuLinks'
}
</script>
