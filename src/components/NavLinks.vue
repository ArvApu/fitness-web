<template>
    <ul>
      <li>
        <router-link :to="{ name: 'Overview'}" exact-active-class="side-panel-exact-active" > Overview </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Messages'}" exact-active-class="side-panel-exact-active" > Messages </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Exercises'}" exact-active-class="side-panel-exact-active" > Exercises </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Workouts'}" exact-active-class="side-panel-exact-active" > Workouts </router-link>
      </li>
    </ul>
</template>

<script>
export default {
  name: 'NavLinks',
  props: {
    msg: String
  }
}
</script>
