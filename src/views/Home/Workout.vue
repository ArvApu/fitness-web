<template>
  <div class="content-box">

    <div v-if="isLoading">
      <page-loading-ring/>
    </div>

    <div v-else>

      <h1> {{ workout.name }} </h1>

      <p>
        <b>Type</b>: {{ workout.type }}
      </p>

      <p>
        {{ workout.description }}
      </p>

      <div class="buttons-control">
        <button class="btn btn-primary" v-on:click="copyWorkout"> <font-awesome-icon icon="copy"/> Copy </button>
        <button class="btn btn-secondary" v-on:click="showEdit"> <font-awesome-icon icon="pen"/> Edit </button>
        <button class="btn  btn-danger" v-on:click="remove"> <font-awesome-icon icon="trash-alt"/> Remove </button>
      </div>

      <table>
        <caption>Exercises</caption>
        <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Sets</th>
          <th scope="col">Reps</th>
          <th scope="col">Rest (s)</th>
          <th scope="col">Video url</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="exercise in workout.exercises" :key="exercise.id">
          <td data-label="Name"> {{ exercise.name }} </td>
          <td data-label="Sets"> {{ exercise.pivot.sets }} </td>
          <td data-label="Reps"> {{ exercise.pivot.reps }} </td>
          <td data-label="Reset (s)"> {{ exercise.pivot.rest }} </td>
          <td data-label="Video url">
            <font-awesome-icon v-if="exercise.url" class='view' icon="video" size="lg" v-on:click="showDetails(exercise)"/>
            <span v-else> - </span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- MODALS -->
    <v-dialog/>

    <modal class="force-scroll-modal" name="assign-exercise-modal" :width=800 :height="'auto'" :adaptive=true :scrollable=true>
      <div class="modal-from">
        <assign-exercise-form @created="add" @canceled="hide" :workout-id="parseInt(this.$route.params.id)" :assigned-exercises-count="exercisesCount"/>
      </div>
    </modal>

    <modal class="force-scroll-modal" name="exercise-details-modal" :width=800 :height="'auto'" :adaptive=true :scrollable=true>
      <div>
        <iframe class="video" :src="this.url"></iframe>
      </div>
    </modal>

    <modal class="force-scroll-modal" name="edit-workout-modal" :width=800 :height="'auto'" :adaptive=true :scrollable=true>
      <div class="modal-from">
        <workout-form v-bind="this.workout" @updated="hideEdit"/>
      </div>
    </modal>

    <button class="btn btn-secondary add-exercise-button" v-on:click="show"> <font-awesome-icon icon="plus"/> Add </button>

  </div>
</template>

<script>

import { mapState, mapActions} from 'vuex';
import AssignExerciseForm from "@/components/Forms/AssignExerciseForm";
import PageLoadingRing from "@/components/PageLoadingRing";
import WorkoutForm from "@/components/Forms/WorkoutForm";

export default {
  name: 'Workout',
  data() {
    return {
      workout: {},
      url: null,
      exercisesCount: 0,
    }
  },
  components: {
    AssignExerciseForm,
    PageLoadingRing,
    WorkoutForm,
  },
  computed: {
    ...mapState('workouts', [
      'errors', 'isLoading'
    ]),
    exercises: () => {
      return this.workout.exercises.sort((a, b) => parseInt(a.order) - parseInt(b.order));
    }
  },
  methods: {
    ...mapActions('workouts', [
      'fetchOne', 'copy', 'delete'
    ]),
    show () {
      this.$modal.show('assign-exercise-modal');
    },
    hide () {
      this.$modal.hide('assign-exercise-modal');
    },
    showEdit () {
      this.$modal.show('edit-workout-modal');
    },
    hideEdit (workout) {
      const exercises = this.workout.exercises;
      this.workout = workout;
      this.workout.exercises = exercises;
      this.$modal.hide('edit-workout-modal');
    },
    showDetails(exercise) {
      this.url = exercise.url;
      this.$modal.show('exercise-details-modal');
    },
    add() {
      this.fetchOne(this.$route.params.id).then(
          result => this.workout = result
      );
      this.exercisesCount++;
      this.hide();
    },
    copyWorkout() {
      this.copy(this.$route.params.id).then((workout) => {
        this.$router.push({ name: 'Workout', params: {id: workout.id}});
      })
    },
    remove() {
      this.$modal.show('dialog', {
        title: 'WARNING',
        text: 'Are you sure want to delete this workout?',
        buttons: [
          {
            title: 'Cancel',
            handler: () => {
              this.$modal.hide('dialog');
            }
          },
          {
            title: 'Yes',
            handler: () => {
              this.$modal.hide('dialog');
              this.delete(this.$route.params.id).then(() => {
                this.$router.push({ name: 'Workouts' });
              });
            }
          },
        ]
      })
    },
  },
  created() {
    this.fetchOne(this.$route.params.id).then(result =>{
      this.workout = result
      this.exercisesCount = result.exercises.length
    });
  },
  watch: {
    '$route.params': {
      handler() {
        this.workout.name = this.workout.name + ' (copy)';
      }
    }
  }
}
</script>

<style scoped>
  @import '../../assets/css/table.css';

  h1 {
    text-transform: capitalize;
    margin-top: 0;
  }

  .add-exercise-button {
    width: 100%;
    padding: 12px 20px;
    display: inline-block;
    margin: 20px 0;
  }

  .view:hover {
    color: var(--primary-color);
    cursor: pointer;
  }

  .video {
    width: 100%;
    height: 550px;
  }

  .buttons-control {
    margin-top: 40px;
  }

  .buttons-control button {
    margin-right: 7px;
    width: 140px;
  }

  @media only screen and (max-width: 500px) {
    .buttons-control {
      display: flex;
      flex-direction: column;
    }
    .buttons-control button {
      width: 100%;
      margin-right: 0;
      margin-bottom: 7px;
    }
  }

</style>