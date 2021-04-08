<template>

  <div class="statistics">

    <div class="general">
      <div class="statistic-general">
        <exercises/>
      </div>
    </div>

    <div class="charts">
      <div class="statistic-chart">
        <workouts/>
      </div>

      <div class="statistic-chart">
        <weight/>
      </div>

      <div class="statistic-chart">
        <workout/>
      </div>

      <div class="statistic-chart">
        <exercise/>
      </div>
    </div>

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
    flex-direction: column;
  }

  .general {
    margin-bottom: 20px;
    width: 100%;
  }

  .charts {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .statistic-chart {
    width: 49%;
    padding: 20px 5px;
    margin-bottom: 15px;
    box-shadow: rgba(0, 0, 0, 0.16) 0 3px 6px, rgba(0, 0, 0, 0.23) 0 3px 6px;
    background: #f3f3f3;
    border-radius: 5px;
    height: 500px;
  }

  .statistic-general {
    display: flex;
  }

  @media only screen and (max-width: 820px) {
    .charts {
      flex-direction: column;
    }

    .statistic-chart {
      width: 100%;
    }
  }
</style>