<template>
  <ul>
    <li>
      <router-link :to="{ name: 'Account'}" exact-active-class="side-panel-exact-active" > Account </router-link>
    </li>
    <li>
      <router-link :to="{ name: 'Security'}" exact-active-class="side-panel-exact-active" > Security </router-link>
    </li>
  </ul>
</template>
<script>

export default {
  name: 'SettingsMenuLinks'
}
</script>
