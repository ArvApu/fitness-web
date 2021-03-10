<template>
    <form id='workout-form' @submit.prevent="handle">

      <alerts :errors="errors"/>

      <div class='form-group'>
        <label for="name"> Name </label>
        <input required class='form-input' type="text" id="name" name="name" v-model="workout.name">
      </div>

      <div class='form-group'>
        <label for="description"> Description </label>
        <textarea required class='form-input-textarea' id="description" name="description" v-model="workout.description" />
      </div>

      <div class='form-group'>
        <label for="type"> Type </label>
        <div class="custom-select">
          <select required id="type" name="type" v-model="workout.type">
            <option disabled selected value="none">Please select type</option>
            <option v-for="type in types" :key="type">{{ type }}</option>
          </select>
        </div>
      </div>

      <div class='form-check'>
        <input type="checkbox" id="is_private" name="is_private" v-model="workout.is_private">
        <label for="is_private"> Workout is private </label>
      </div>

      <form-submit-button label="Submit"/>

    </form>
</template>

<script>

import Alerts from "@/components/Alerts";
import {mapState} from "vuex";

export default {
  name: 'WorkoutForm',
  props: {
    id: Number,
    name: String,
    description: String,
    type: String,
    is_private: Boolean,
  },
  components: {
    Alerts
  },
  computed: {
    ...mapState('workouts', [
      'errors'
    ])
  },
  data() {
    return {
      workout: {
        id: this.id,
        name: this.name,
        description: this.description,
        type: this.type ?? 'none',
        is_private: this.is_private ?? false,
      },
      types: ['general', 'cardio', 'hiit', 'weight', 'recovery']
    }
  },
  methods: {
    handle() {
      if(this.workout.id) {
        this.update();
      } else {
        this.create();
      }
    },
    create() {
      this.$store.dispatch('workouts/create', this.workout)
          .then(() => {
            this.$emit('created')
          });
    },
    update() {
      this.$store.dispatch('workouts/update', this.workout)
          .then(() => {
            this.$emit('updated')
          });
    },
  },
  created() {
    this.$store.dispatch('workouts/clearErrors')
  }
}
</script>