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
            <textarea class='form-input-textarea' id="comment" name="comment" v-model="log.comment" placeholder="Optional comment"/>
          </div>

          <div v-if="log.status !== 'missed'">
            <div v-for="exercise in workout.exercises " :key="exercise.id">
              <h4>{{ exercise.name }}</h4>

              <div class='form-group'>
                <label :for="`${exercise.id}-sets`" class="exercise-log-input-label"> Sets done </label>
                <input required class="exercise-log-input" @input="updateExerciseLog(parseInt($event.target.value), exercise, 'sets_done')"
                       :max="exercise.pivot.sets" type="number" :id="`${exercise.id}-sets`" placeholder="Number of sets done"> <b style="font-size: 18px"> / {{ exercise.pivot.sets }}</b>
              </div>

              <div class='form-group'>
                <label :for="`${exercise.id}-measurement-value`" class="exercise-log-input-label"> Did total of {{ exercise.measurement }} per set </label>
                <input required class="exercise-log-input" @input="updateExerciseLog(parseInt($event.target.value), exercise, 'measurement_value')"
                       type="number" :id="`${exercise.id}-measurement-value`" placeholder="Value of exercise measurement">
              </div>
              <hr>
            </div>
          </div>

          <div class='form-group'>
            <form-submit-button label="Log"/>
          </div>
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

      this.create(log).then(() => {
        this.$router.push({name: 'Calendar' });
      });
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


<style scoped>

h4 {
  text-transform: capitalize;
}

.exercise-log-input-label {
  text-transform: capitalize;
  display: block;
}


.exercise-log-input {
  width: 50%;
  padding: 12px 20px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin: 4px 0;
}

@media only screen and (max-width: 900px) {
  .exercise-log-input {
    width: 80%;
    padding: 12px 20px;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin: 4px 0;
  }
}
</style>