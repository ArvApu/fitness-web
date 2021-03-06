<template>

  <div class="event-container">

    <div v-if="isLoading || firstLoad">
      <page-loading-ring/>
    </div>

    <div v-else class="event">
      <h1> {{ event.title }} </h1>

      <h4> Information </h4>
      <div class="information"> {{ event.information }} </div>

      <h4> Duration </h4>
      <div v-if="event.all_day">
        <span> All day - <b>{{ event.start_time.substring(0, 10) }}</b> </span>
      </div>
      <div v-else class="dates">
        <span> <b>From:</b> {{ event.start_time }}</span>
        <span> <b>To:</b> {{ event.end_time }}</span>
      </div>

      <h4> Workout </h4>
      <div v-if="event.workout_id">
        <router-link class="workout-link" :to="{ name: this.workoutRouteName, params: {id: event.workout_id}}">
          <span>{{ event.workout.name }}</span> <font-awesome-icon icon="angle-double-right" />
        </router-link>
      </div>
      <div v-else>
        No linked workout
      </div>

      <div class="control-box">
        <button v-if="event.workout_id" v-on:click="log(event.workout_id)" class="btn btn-secondary"> <font-awesome-icon icon="pen"/>  Log event's workout </button>
        <button v-if="canControl" v-on:click="remove" class="btn btn-danger"> <font-awesome-icon icon="trash-alt"/> Remove event </button>
      </div>
    </div>

    <!-- MODALS -->
    <v-dialog/>

  </div>

</template>

<script>
import {mapActions, mapState} from "vuex";
import PageLoadingRing from "@/components/PageLoadingRing";

export default {
  name: 'Event',
  components: {
    PageLoadingRing,
  },
  data() {
    return {
      id: this.$route.params.id,
      userId: this.$store.state.auth.clientId || this.$store.state.auth.user_id,
      event: {
        title: null
      },
      canControl: ['trainer', 'admin'].includes(this.$store.state.auth.user.role),
      firstLoad: true,
      workoutRouteName: this.$store.state.auth.user.role === 'user' ? 'ClientWorkout' : 'Workout'
    }
  },
  computed: {
    ...mapState('events', [
        'isLoading'
    ])
  },
  methods: {
    ...mapActions('events', [
      'fetchOne', 'delete'
    ]),
    log(id) {
      this.$router.push({name: 'LogWorkout', params: {id: id},  query: {date: this.event.start_time}});
    },
    remove() {
      this.$modal.show('dialog', {
        title: 'WARNING',
        text: 'Are you sure you want to delete this event?',
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
              this.delete(this.id).then(() => this.$router.push({ name: 'Calendar'}));
            }
          },
        ]
      })
    },
  },
  created() {
    this.fetchOne({id: this.id, userId: this.userId}).then((result) => {
      this.event = result;
    }).catch(() => {
      this.$router.back();
    }).finally(() => {
      this.firstLoad = false;
    });
  }
}
</script>

<style scoped lang="css" src="../../assets/css/event.css"/>