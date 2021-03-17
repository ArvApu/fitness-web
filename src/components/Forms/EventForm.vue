<template>
  <form id='exercise-form' @submit.prevent="handle">

    <alerts :errors="errors"/>

    <div class='form-group'>
      <label for="title"> Title </label>
      <input required class='form-input' type="text" id="title" name="title" v-model="eventObj.title">
    </div>

    <div class='form-check'>
      <input type="checkbox" id="all_day" name="all_day" v-model="eventObj.all_day">
      <label for="all_day"> Will event be all day? </label>
    </div>

    <hr>

      <div v-if="eventObj.all_day">
        <div class='form-group'>
          <label> Date </label>
          <datepicker v-model="eventObj.start_time" :lang="lang" value-type="YYYY-MM-DD HH:mm:ss" format="YYYY-MM-DD" type="date" class="date-picker-input"/>
        </div>
      </div>

      <div v-else>
        <div class='form-group'>
          <label> Start time </label>
          <datepicker v-model="eventObj.start_time" :lang="lang" value-type="YYYY-MM-DD HH:mm:ss" format="YYYY-MM-DD HH:mm:ss" type="datetime" class="date-picker-input"/>
        </div>

        <div class='form-group' >
          <label> End time </label>
          <datepicker v-model="eventObj.end_time" :lang="lang" value-type="YYYY-MM-DD HH:mm:ss" format="YYYY-MM-DD HH:mm:ss" type="datetime" class="date-picker-input"/>
        </div>
      </div>

    <form-submit-button label="Submit"/>

  </form>
</template>

<script>

import {mapState} from "vuex";
import Datepicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
  name: 'EventForm',
  components: {
    Datepicker,
  },
  computed: {
    ...mapState('events', [
      'errors'
    ])
  },
  data() {
    return {
      eventObj: {
        attendee_id: this.$store.state.auth.clientId ?? this.$store.state.auth.user.id,
        title: null,
        information: 'this.title',
        start_time: null,
        end_time: null,
        all_day: false,
      },
      lang: {
        formatLocale: {
          firstDayOfWeek: 1,
        },
        monthBeforeYear: false,
      },
    }
  },
  methods: {
    handle() {
      if(!this.eventObj.end_time) {
        this.eventObj.end_time = this.eventObj.start_time
      }

      this.$store.dispatch('events/create', this.eventObj)
          .then((result) => {
            this.$emit('created', result)
          });
    },
  },
  created() {
    this.$store.dispatch('events/clearErrors')
  }
}
</script>