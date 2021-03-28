<template>
  <form id='exercise-form' @submit.prevent="handle">

    <alerts :errors="errors"/>

    <div class='form-group'>
      <label for="title"> Title </label>
      <input required class='form-input' type="text" id="title" name="title" v-model="eventObj.title">
    </div>

    <div class='form-group'>
      <label> Workout (optional) </label>
      <v-select @search="fetchWorkouts" :appendToBody="true" :filterable="false" :options="workouts" label="name" :reduce="workout => workout.id" v-model="workoutId">
        <li slot="list-footer" class="pagination">
          <button class="btn btn-secondary" @click.prevent="prevPage()" :disabled="!hasPrevPage">Prev</button>
          <button class="btn btn-secondary" @click.prevent="nextPage()" :disabled="!hasNextPage">Next</button>
        </li>
      </v-select>
    </div>

    <div class='form-group'>
      <label for="information"> Information (optional) </label>
      <textarea class='form-input-textarea' id="information" name="information" v-model="eventObj.information" />
    </div>

    <div class='form-check'>
      <input type="checkbox" id="all_day" name="all_day" v-model="eventObj.all_day">
      <label for="all_day"> Will event be all day? </label>
    </div>

    <hr>

      <div v-show="eventObj.all_day">
        <div class='form-group'>
          <label> Date </label>
          <flat-pickr v-model="eventObj.start_time" :config="configDateOnly" class="form-input" placeholder="Date only"/>
        </div>
      </div>

      <div v-show="!eventObj.all_day">
        <div class='form-group'>
          <label> Start time </label>
          <flat-pickr v-model="eventObj.start_time" :config="config" class="form-input" placeholder="Date and time"/>
        </div>

        <div class='form-group' >
          <label> End time </label>
          <flat-pickr v-model="eventObj.end_time" :config="config" class="form-input" placeholder="Date and time"/>
        </div>
      </div>

    <form-submit-button label="Submit"/>

  </form>
</template>

<script>

import {mapState} from "vuex";
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
  name: 'EventForm',
  components: {
    flatPickr,
  },
  computed: {
    ...mapState('events', [
      'errors'
    ]),
    ...mapState('workouts', [
        'workouts', 'paginator'
    ]),
    hasNextPage () {
      return Boolean(this.paginator.currentPage < this.paginator.lastPage);
    },
    hasPrevPage () {
      return Boolean(this.paginator.currentPage >= this.paginator.lastPage && this.paginator.currentPage !== 1);
    }
  },
  data() {
    return {
      eventObj: {
        attendee_id: this.$store.state.auth.clientId ?? this.$store.state.auth.user.id,
        title: null,
        information: null,
        start_time: null,
        end_time: null,
        all_day: false,
      },
      workoutId: null,
      config: {
        enableTime: true,
        dateFormat: "Y-m-d H:i:S",
        time_24hr: true,
        locale: {
          firstDayOfWeek: 1,
        },
      },
      configDateOnly: {
        altInput: true,
        altFormat: "Y-m-d",
        dateFormat: "Y-m-d H:i:S",
        locale: {
          firstDayOfWeek: 1,
        },
      },
    }
  },
  methods: {
    handle() {
      if(!this.eventObj.end_time) {
        this.eventObj.end_time = this.eventObj.start_time;
      }

      if(!this.eventObj.information) {
        this.eventObj.information = this.eventObj.title;
      }

      if(this.workoutId) {
        this.eventObj.workout_id = this.workoutId;
      }

      this.$store.dispatch('events/create', this.eventObj)
        .then((result) => {
          this.$emit('created', result)
        });
    },
    fetchWorkouts(search, loading) {
      loading(true)
      this.search = !search.length ? null : search;
      this.$store.dispatch('workouts/fetchAll', {
        page: 1, search: search
      }).finally(() => loading(false))
    },
    nextPage() {
      this.$store.dispatch('workouts/fetchAll', {
        page: this.paginator.currentPage + 1, search: this.search
      });
    },
    prevPage() {
      this.$store.dispatch('workouts/fetchAll', {
        page: this.paginator.currentPage - 1, search: this.search
      });
    }
  },
  created() {
    this.$store.dispatch('events/clearErrors');
    this.$store.dispatch('workouts/fetchAll', {page: 1})
  }
}
</script>

<style scoped>
  .pagination {
    display: flex;
    margin: .25rem .25rem 0;
  }

  .pagination button {
    flex-grow: 1;
  }

  .pagination button:disabled {
    cursor: default;
  }
</style>