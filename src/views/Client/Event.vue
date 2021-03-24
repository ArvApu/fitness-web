<template>

  <div class="event-container">
    <div class="event">
      <h1> {{ event.title }} </h1>

      <h4> Information </h4>
      <div class="information"> {{ event.information }} </div>

      <h4> Duration </h4>
      <div v-if="event.all_day">
        <span> All day </span>
      </div>
      <div v-else class="dates">
        <span> <b>From:</b> {{ event.start_time }}</span>
        <span> <b>To:</b> {{ event.end_time }}</span>
      </div>

      <h4> Workout </h4>
      <div v-if="event.workout_id">
        <router-link class="workout-link" :to="{ name: 'Workout', params: {id: event.workout_id}}">
          <span>{{ event.workout.name }}</span> <font-awesome-icon icon="angle-double-right" />
        </router-link>
      </div>
      <div v-else>
        No linked workout
      </div>

      <div v-if="canControl" class="control-box">
        <button v-on:click="edit" class="btn btn-secondary"> Edit </button>
        <button v-on:click="remove" class="btn btn-danger"> Remove </button>
      </div>
    </div>

    <!-- MODALS -->
    <v-dialog/>

  </div>

</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'Event',
  data() {
    return {
      id: this.$route.params.id,
      userId: this.$store.state.auth.clientId || this.$store.state.auth.user_id,
      event: {
        title: null
      },
      canControl: ['trainer', 'admin'].includes(this.$store.state.auth.user.role),
    }
  },
  methods: {
    ...mapActions('events', [
      'fetchOne', 'delete'
    ]),
    edit() {
      console.log('edit'); // TODO: Implement
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
    });
  }
}
</script>


<style scoped>

  .event-container {
    margin: 1rem 1em 1rem 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .event h4 {
    margin: 15px 0;
  }

  .event {
    width: 900px;
    padding: 5px 30px;
    box-shadow: 1px 4px 8px 1px rgba(0,0,0,0.2);
    box-sizing: border-box;
    border-radius: 7px;
  }

  .information {
    display: flex;
    padding: 7px;
    border: 1px solid #999999;
    border-radius: 5px;
  }

  .control-box {
    display: flex;
    justify-content: space-between;
    width: 140px ;
    margin-bottom: 30px;
    margin-top: 15px;
  }

  .dates span {
    display: flex;
    justify-content: space-between;
    width: 240px;
  }

  .workout-link {
    cursor: pointer;
    text-transform: capitalize;
    text-decoration: none;
    font-weight: bold;
    color: #393e46;
    border-bottom: 1px solid #999999;
    /*border: 1px solid red;*/
    /*overflow: hidden;*/
  }

  .workout-link span {
    margin-right: 5px;
    transition: margin-right 0.5s;
    transition-timing-function: ease-out;
  }

  .workout-link:hover {
    color: var(--primary-color);
  }

  .workout-link:hover span {
    margin-right: 20px;
  }

  @media only screen and (max-width: 1220px) {
    .event {
      width: 600px;
    }
  }

  @media only screen and (max-width: 700px) {
    .event {
      width: 100%;
    }

    .control-box {
      width: 100%;
      flex-direction: column;
    }

    .control-box button:first-child {
      margin-bottom: 5px;
    }
  }
</style>