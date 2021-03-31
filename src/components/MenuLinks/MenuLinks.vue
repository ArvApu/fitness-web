<template>
    <ul>
      <li>
        <router-link :to="{ name: 'Overview'}" exact-active-class="side-panel-exact-active" > <font-awesome-icon icon="home" fixed-width/> Overview </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Messages'}" exact-active-class="side-panel-exact-active" > <font-awesome-icon icon="comments" fixed-width/> Messages </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Exercises'}" exact-active-class="side-panel-exact-active" > <font-awesome-icon icon="dumbbell" fixed-width/> Exercises </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Workouts'}" exact-active-class="side-panel-exact-active" > <font-awesome-icon icon="swimmer" fixed-width/> Workouts </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Clients'}" exact-active-class="side-panel-exact-active" > <font-awesome-icon icon="users" fixed-width/> Clients </router-link>
      </li>
    </ul>
</template>

<script>
export default {
  name: 'MenuLinks',
}
</script>
