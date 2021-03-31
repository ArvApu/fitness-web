<template>
  <ul>
    <li>
      <router-link :to="{ name: 'Statistics'}" exact-active-class="side-panel-exact-active" > <font-awesome-icon icon="chart-bar" fixed-width/> Statistics </router-link>
    </li>
    <li>
      <router-link :to="{ name: 'Calendar'}" exact-active-class="side-panel-exact-active" > <font-awesome-icon icon="calendar" fixed-width/> Calendar </router-link>
    </li>
    <li v-show="user.role === 'user'">
      <router-link :to="{ name: 'ClientMessages'}" exact-active-class="side-panel-exact-active" >  <font-awesome-icon icon="comments" fixed-width/> Messages </router-link>
    </li>
  </ul>
</template>
<script>

import { mapState } from "vuex";

export default {
  name: 'ClientMenuLinks',
  computed: {
    ...mapState('auth', [
      'user'
    ])
  }
}
</script>
