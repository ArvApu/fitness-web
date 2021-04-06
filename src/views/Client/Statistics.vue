<template>

  <div class="statistics">
    <workouts/>
  </div>

</template>

<script>
import Workouts from "@/components/Statistics/Workouts";

export default {
  name: 'Statistics',
  components: {
    Workouts
  },
}
</script>

<style scoped>
  .statistics {
    display: flex;
  }
</style>