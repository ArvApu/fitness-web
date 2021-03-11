<template>
  <div class="content-box">

    <h1> {{ workout.name }} </h1>

    <p>
      {{ workout.description }}
    </p>

    <table>
      <caption>Exercises</caption>
      <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Sets</th>
        <th scope="col">Reps</th>
        <th scope="col">Reset (s)</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="exercise in workout.exercises" :key="exercise.id">
        <td data-label="Name"> {{ exercise.name }} </td>
        <td data-label="Sets"> {{ exercise.pivot.sets }} </td>
        <td data-label="Reps"> {{ exercise.pivot.reps }} </td>
        <td data-label="Reset (s)"> {{ exercise.pivot.rest }} </td>
      </tr>
      </tbody>
    </table>

    <!-- MODALS -->

    <modal class="force-scroll-modal" name="assign-exercise-modal" :width=800 :height="'auto'" :adaptive=true :scrollable=true>
      <div class="modal-from">
        <assign-exercise-form @created="hide" @updated="hide" @canceled="hide"/>
      </div>
    </modal>

    <button class="btn btn-secondary add-exercise-button" v-on:click="show"> <font-awesome-icon icon="plus"/> Add </button>

  </div>
</template>

<script>

import { mapState, mapActions} from 'vuex';
import AssignExerciseForm from "@/components/Forms/AssignExerciseForm";

export default {
  name: 'Workout',
  data() {
    return {
      workout: {},
    }
  },
  components: {
    AssignExerciseForm
  },
  computed: {
    ...mapState('workouts', [
      'errors'
    ])
  },
  methods: {
    ...mapActions('workouts', [
      'fetchOne',
    ]),
    show () {
      this.$modal.show('assign-exercise-modal');
    },
    hide () {
      this.$modal.hide('assign-exercise-modal');
    },
  },
  created() {
    this.fetchOne(this.$route.params.id).then(
        result => this.workout = result
    );
  }
}
</script>

<style scoped>
  @import '../../assets/css/table.css';

  h1 {
    text-transform: capitalize;
  }

  .add-exercise-button {
    width: 100%;
    padding: 12px 20px;
    display: inline-block;
    margin: 20px 0;
  }

</style>