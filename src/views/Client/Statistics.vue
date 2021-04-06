<template>

  <div class="statistics">
    <workouts/>
    <workout/>
  </div>

</template>

<script>
import Workouts from "@/components/Statistics/Workouts";
import Workout from "@/components/Statistics/Workout";

export default {
  name: 'Statistics',
  components: {
    Workouts,
    Workout,
  },
}
</script>

<style scoped>
  .statistics {
    display: flex;
  }
</style>