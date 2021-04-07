<template>

  <div class="statistics">
    <workouts/>
    <workout/>
    <exercises/>
    <exercise/>
    <weight/>
  </div>

</template>

<script>
import Workouts from "@/components/Statistics/Workouts";
import Workout from "@/components/Statistics/Workout";
import Exercises from "@/components/Statistics/Exercises";
import Exercise from "@/components/Statistics/Exercise";
import Weight from "@/components/Statistics/Weight";

export default {
  name: 'Statistics',
  components: {
    Workouts,
    Workout,
    Exercises,
    Exercise,
    Weight,
  },
}
</script>

<style scoped>
  .statistics {
    display: flex;
  }
</style>