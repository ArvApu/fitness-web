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
        this.eventObj.end_time = this.eventObj.start_time
      }

      this.$store.dispatch('events/create', this.eventObj)
          .then((result) => {
            this.$emit('created', result)
          });
    },
  },
  watch: {
    'eventObj.all_day': function(val) {
      if (val) {
        this.$set(this.config, 'altInput', true);
        this.$set(this.config, 'enableTime', false);
      } else {
        this.$set(this.config, 'altInput', false);
        this.$set(this.config, 'enableTime', true);
      }
    },
  },
  created() {
    this.$store.dispatch('events/clearErrors');
  }
}
</script>