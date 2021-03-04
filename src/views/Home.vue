<template>
  <div class="home">
    <ul>
      <li>
        <router-link :to="{ name: 'Messages' }" exact-active-class="side-panel-exact-active" > Messages </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Exercises' }" exact-active-class="side-panel-exact-active" > Exercises </router-link>
      </li>
    </ul>
  </div>
</template>
<script>

export default {
  name: 'Home'
}
</script>
