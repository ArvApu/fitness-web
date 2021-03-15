<template>
  <ul>
    <li>
      <router-link :to="{ name: 'Statistics'}" exact-active-class="side-panel-exact-active" > Statistics </router-link>
    </li>
    <li>
      <router-link :to="{ name: 'Calendar'}" exact-active-class="side-panel-exact-active" > Calendar </router-link>
    </li>
    <li v-show="!userId && user.role === 'user'">
      <router-link :to="{ name: 'ClientMessages'}" exact-active-class="side-panel-exact-active" > Messages </router-link>
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
  },
  props: {
    userId: {
      type: Number,
      required: false,
    }
  },
  created() {
    // TODO: improve
    // if(!this.userId && this.user.role !== 'user') {
    //   this.$router.back();
    // }
  }
}
</script>
