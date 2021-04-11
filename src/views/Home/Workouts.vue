<template>
  <div class="content-box">

    <div v-if="isLoading || firstLoad">
      <page-loading-ring/>
    </div>

    <div v-else>

      <button v-if='canControl' class="btn btn-primary add-btn" v-on:click="add"> <font-awesome-icon icon="plus"/> Add workout </button>

      <empty-message-block :show="workouts === undefined || workouts.length === 0" resource="workouts"/>

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
            <font-awesome-icon v-if='canControl' class='remove' icon="trash-alt" size="lg" v-on:click="remove(workout.id)"/>
          </div>

        </div>

        <paginator @paginate="paginate" v-bind="paginator"/>
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
import WorkoutForm from "@/components/Forms/WorkoutForm";
import EmptyMessageBlock from "@/components/EmptyMessageBlock";
import Paginator from "@/components/Paginator";
import PageLoadingRing from "@/components/PageLoadingRing";

export default {
  name: 'Workouts',
  components: {
    WorkoutForm,
    EmptyMessageBlock,
    Paginator,
    PageLoadingRing,
  },
  data() {
    return {
      workout: null,
      firstLoad: true,
      canControl: ['trainer', 'admin'].includes(this.$store.state.auth.user.role),
    }
  },
  computed: {
    ...mapState('workouts', [
      'workouts', 'paginator', 'isLoading'
    ])
  },
  methods: {
    ...mapActions('workouts', [
      'fetchAll', 'delete'
    ]),
    view(id) {
      const route = this.$store.state.auth.user.role === 'user' ? 'ClientWorkout' : 'Workout'
      this.$router.push({ name: route, params: { id: id }})
    },
    add() {
      this.workout = null;
      this.show();
    },
    edit(workout) {
      if(this.canControl) {
        this.workout = workout;
        this.show();
      } else {
        this.$router.push({ name: "LogWorkout", params: {id: workout.id} });
      }
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
      this.$modal.show('add-workout-modal');
    },
    hide () {
      this.$modal.hide('add-workout-modal');
    },
    paginate(page) {
      this.fetchAll({page: page})
    }
  },
  created() {
    this.fetchAll({page: 1}).finally(() => {
      this.firstLoad = false;
    });
  }
}
</script>

<style scoped lang="css" src="../../assets/css/items.css"/>