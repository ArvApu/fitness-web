<template>
    <ul>
      <li>
        <router-link :to="{ name: 'Overview'}" exact-active-class="side-panel-exact-active" > <font-awesome-icon icon="home"/> Overview </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Messages'}" exact-active-class="side-panel-exact-active" > <font-awesome-icon icon="comments"/> Messages </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Exercises'}" exact-active-class="side-panel-exact-active" > <font-awesome-icon icon="dumbbell"/> Exercises </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Workouts'}" exact-active-class="side-panel-exact-active" > <font-awesome-icon icon="running" size="lg"/> Workouts </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Clients'}" exact-active-class="side-panel-exact-active" > <font-awesome-icon icon="users"/> Clients </router-link>
      </li>
    </ul>
</template>

<script>
export default {
  name: 'MenuLinks',
}
</script>
