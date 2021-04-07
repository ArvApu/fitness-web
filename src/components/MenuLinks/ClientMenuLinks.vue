<template>
  <div id="client-menu">
    <div class="client-name" v-show="user && user.role !== 'user'">
      <font-awesome-icon icon="user" fixed-width/> {{ this.$store.state.auth.clientName }}
    </div>
    <ul>
      <li>
        <router-link :to="{ name: 'Calendar'}" exact-active-class="side-panel-exact-active" > <font-awesome-icon icon="calendar" fixed-width/> Events </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Statistics'}" exact-active-class="side-panel-exact-active" > <font-awesome-icon icon="chart-bar" fixed-width/> Statistics </router-link>
      </li>
      <li v-show="user && user.role === 'user'">
        <router-link :to="{ name: 'ClientMessages'}" exact-active-class="side-panel-exact-active" >  <font-awesome-icon icon="comments" fixed-width/> Messages </router-link>
      </li>
    </ul>
  </div>
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

<style scoped>
  .client-name {
    min-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    background: var(--header-bg-color);
    color: white;
    margin: 7px;
    border-radius: 5px;
    padding: 5px;
    text-overflow: ellipsis;
  }
  .client-name svg {
    margin-right: 5px;
  }
</style>