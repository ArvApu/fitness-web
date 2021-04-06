<template>

  <div class="statistics">
    <workouts/>
    <workout/>
    <exercises/>
  </div>

</template>

<script>
import Workouts from "@/components/Statistics/Workouts";
import Workout from "@/components/Statistics/Workout";
import Exercises from "@/components/Statistics/Exercises";

export default {
  name: 'Statistics',
  components: {
    Workouts,
    Workout,
    Exercises,
  },
}
</script>

<style scoped>
  .statistics {
    display: flex;
  }
</style>