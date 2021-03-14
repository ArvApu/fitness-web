<template>

  <div>
        <form id='workout-log-form' @submit.prevent="handle">

          <alerts :errors="errors"/>

          <div class='form-group'>
            <label for="status"> Status </label>
            <div class="custom-select">
              <select required id="status" name="status" v-model="log.status">
                <option v-for="status in statuses" :key="status">{{ status }}</option>
              </select>
            </div>
          </div>

          <div class='form-group' v-show="log.status !== 'missed'">
            <label for="difficulty"> Difficulty </label>
            <div class="custom-select">
              <select required id="difficulty" name="difficulty" v-model="log.difficulty">
                <option v-for="difficulty in difficulties" :key="difficulty">{{ difficulty }}</option>
              </select>
            </div>
          </div>

          <div class='form-group'>
            <label for="comment"> Comment (optional) </label>
            <textarea class='form-input-textarea' id="comment" name="comment" v-model="log.comment" />
          </div>

          <div v-if="log.status !== 'missed'">
            <div v-for="exercise in workout.exercises " :key="exercise.id">
              {{ exercise.name }}
              <br>
              <input required @input="updateExerciseLog(parseInt($event.target.value), exercise, 'sets_done')" :max="exercise.pivot.sets" type="number"> / {{ exercise.pivot.sets }}
              <br>
              <input required @input="updateExerciseLog(parseInt($event.target.value), exercise, 'weight')" type="number">
              <hr>
            </div>
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
        difficulty: 'easy',
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