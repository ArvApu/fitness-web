<template>
  <form id='exercise-form' @submit.prevent="handle">

    <alerts :errors="errors"/>

    <div class='form-group'>
      <label for="title"> Title </label>
      <input required class='form-input' type="text" id="title" name="title" v-model="eventObj.title">
    </div>

    <div class='form-group'>
      <label> Start time </label>
      <datepicker v-model="eventObj.start_time" :lang="lang" value-type="YYYY-MM-DD HH:mm:ss" format="YYYY-MM-DD HH:mm:ss" type="datetime" class="date-picker-input"/>
    </div>

    <div class='form-group'>
      <label> End time </label>
      <datepicker v-model="eventObj.end_time" :lang="lang" value-type="YYYY-MM-DD HH:mm:ss" format="YYYY-MM-DD HH:mm:ss" type="datetime" class="date-picker-input"/>
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
      console.log(this.eventObj);
      this.$store.dispatch('events/create', this.eventObj)
          .then(() => {
            this.$emit('created')
          });
    },
  },
  created() {
    this.$store.dispatch('exercises/clearErrors')
  }
}
</script>