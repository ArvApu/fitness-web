<template>
  <div class="content-box">

    <div>

      <button class="btn btn-primary" v-on:click="add"> <font-awesome-icon icon="plus"/> Add workout </button>

      <div class="items">

        <div class="item" v-for="workout in workouts" :key="workout.id">

          <div class="info">

            <h3> {{ workout.name }} </h3>

            <div class="description">
              {{ workout.description }}
            </div>
          </div>

          <div class="control">
            <font-awesome-icon class='view' icon="eye" size="lg" v-on:click="view(workout.id)"/>
            <font-awesome-icon class='edit' icon="pen" size="lg" v-on:click="edit(workout)"/>
            <font-awesome-icon class='remove' icon="trash-alt" size="lg" v-on:click="remove(workout.id)"/>
          </div>

        </div>
      </div>

      <!-- MODALS -->
      <v-dialog/>

      <modal class="force-scroll-modal" name="add-workout-modal" :width=800 :height="'auto'" :adaptive=true :scrollable=true>
        <div class="modal-from">
          <workout-form v-bind="this.workout" @created="hide" @updated="hide"/>
        </div>
      </modal>

    </div>

  </div>
</template>

<script>

import { mapState, mapActions} from 'vuex';
import WorkoutForm from "@/components/WorkoutForm";

export default {
  name: 'Workouts',
  components: {
    WorkoutForm
  },
  data() {
    return {
      workout: null,
    }
  },
  computed: {
    ...mapState('workouts', [
      'workouts'
    ])
  },
  methods: {
    ...mapActions('workouts', [
      'fetchAll', 'delete', 'clearErrors'
    ]),
    view(id) {
      console.log('workout view', id);
      // TODO: open workout view
    },
    add() {
      this.workout = null;
      this.show();
    },
    edit(workout) {
      this.workout = workout;
      this.show();
    },
    remove(id) {
      this.$modal.show('dialog', {
        title: 'WARNING',
        text: 'You are going to delete a workout. Are you sure you want to do this?',
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
              this.delete(id);
            }
          },
        ]
      })
    },
    show () {
      this.clearErrors();
      this.$modal.show('add-workout-modal');
    },
    hide () {
      this.$modal.hide('add-workout-modal');
    },
  },
  created() {
    this.fetchAll()
  }
}
</script>

<style scoped>
  @import '../../assets/css/items.css';
</style>