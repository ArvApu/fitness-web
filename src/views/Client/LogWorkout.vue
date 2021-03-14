<template>

  <div>

        <form id='workout-log-form' @submit.prevent="handle">

          <alerts :errors="errors"/>

<!--          <div class='form-group'>-->
<!--            <label for="name"> Name </label>-->
<!--            <input required class='form-input' type="text" id="name" name="name" v-model="exercise.name">-->
<!--          </div>-->

<!--          <div class='form-group'>-->
<!--            <label for="description"> Description </label>-->
<!--            <textarea required class='form-input-textarea' id="description" name="description" v-model="exercise.description" />-->
<!--          </div>-->

<!--          <div class='form-check'>-->
<!--            <input type="checkbox" id="is_private" name="is_private" v-model="exercise.is_private">-->
<!--            <label for="is_private"> Exercise is private </label>-->
<!--          </div>-->


          <div class='form-group'>
            <label for="status"> Status </label>
            <div class="custom-select">
              <select required id="status" name="status" v-model="log.status">
                <option disabled selected value="none">Please select a status</option>
                <option v-for="status in statuses" :key="status">{{ status }}</option>
              </select>
            </div>
          </div>

          <div class='form-group'>
            <label for="difficulty"> Status </label>
            <div class="custom-select">
              <select required id="difficulty" name="difficulty" v-model="log.difficulty">
                <option disabled selected value="none">Please select a difficulty</option>
                <option v-for="difficulty in difficulties" :key="difficulty">{{ difficulty }}</option>
              </select>
            </div>
          </div>

          <div v-for="exercise in workout.exercises " :key="exercise.id">
            {{ exercise.name }}
            <br>
            <input required @input="updateExerciseLog(parseInt($event.target.value), exercise, 'sets_done')" :max="exercise.pivot.sets" type="number"> / {{ exercise.pivot.sets }}
            <br>
            <input required @input="updateExerciseLog(parseInt($event.target.value), exercise, 'weight')" type="number">
            <hr>
          </div>

          <form-submit-button label="Log"/>

        </form>
  </div>

</template>

<script>

import {mapState, mapActions} from "vuex";

export default {
  name: 'LogWorkout',
  computed: {
    ...mapState('workoutLogs', [
      'errors'
    ])
  },
  data() {
    return {
      workout: {},
      log: {
        workoutId: this.$route.params.id,
        status: 'completed',
        comment: null,
        difficulty: 'none',
      },
      exerciseLogs: [],
      statuses: ['missed', 'interrupted', 'completed'],
      difficulties: ['easy', 'moderate', 'hard', 'exhausting'],
    }
  },
  methods: {
    ...mapActions('workouts', [
      'fetchOne',
    ]),
    ...mapActions('workoutLogs', [
      'create'
    ]),
    handle() {

      let log = {
        workout_id: this.log.workoutId,
        status: this.log.status,
        difficulty: this.log.difficulty,
        exercise_logs: this.exerciseLogs,
      };

      if(this.log.comment) {
        log['comment'] = this.log.comment;
      }

      this.create(log); // TODO: success message
    },
    updateExerciseLog(value, exercise, field) {
      const foundIndex = this.exerciseLogs.findIndex(x => x.exercise_id === exercise.id);

      if(foundIndex > -1) {
        this.exerciseLogs[foundIndex][field] = value;
        return;
      }

      let el = {
        exercise_id: exercise.id,
        sets_count: exercise.pivot.sets,
      };
      el[field] = value;

      this.exerciseLogs.push(el);
    }
  },
  created() {
    this.fetchOne(this.$route.params.id).then(
        result => this.workout = result
    );
  }
}
</script>