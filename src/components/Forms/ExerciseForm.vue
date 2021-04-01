<template>
    <form id='exercise-form' @submit.prevent="handle">

      <alerts :errors="errors"/>

      <div class='form-group'>
        <label for="name"> Name </label>
        <input required class='form-input' type="text" id="name" name="name" v-model="exercise.name">
      </div>

      <div class='form-group'>
        <label for="description"> Description (optional) </label>
        <textarea class='form-input-textarea' id="description" name="description" v-model="exercise.description" />
      </div>

      <div class='form-group'>
        <label for="url"> Video url (optional) </label>
        <input class='form-input' type="url" id="url" name="url" v-model="exercise.url">
      </div>

      <div class='form-group'>
        <label for="measurement"> Measurement </label>
        <div class="custom-select">
          <select required id="measurement" name="measurement" v-model="exercise.measurement">
            <option disabled selected value="none">Please select a measurement</option>
            <option v-for="measurement in measurements" :key="measurement">{{ measurement }}</option>
          </select>
        </div>
      </div>

      <form-submit-button label="Submit" :processing="isLoading"/>

    </form>
</template>

<script>

import {mapState} from "vuex";

export default {
  name: 'ExerciseForm',
  props: {
    id: Number,
    name: String,
    description: String,
    is_private: Boolean,
    url: String,
    measurement: String,
  },
  computed: {
    ...mapState('exercises', [
      'errors'
    ])
  },
  data() {
    return {
      isLoading: false,
      measurements: ['seconds', 'minutes', 'grams', 'kilograms', 'quantity'],
      exercise: {
        id: this.id,
        name: this.name,
        description: this.description,
        url: this.url,
        measurement: this.measurement ?? 'none',
      },
    }
  },
  methods: {
    handle() {
      this.isLoading = true;
      if(this.exercise.id) {
        this.update();
      } else {
        this.create();
      }
    },
    create() {
      this.$store.dispatch('exercises/create', this.exercise)
          .then(() => {
            this.$emit('created')
          }).finally(() => {
            this.isLoading = false;
      });
    },
    update() {
      this.$store.dispatch('exercises/update', this.exercise)
          .then(() => {
            this.$emit('updated')
          }).finally(() => {
            this.isLoading = false;
      });
    }
  },
  created() {
    this.$store.dispatch('exercises/clearErrors')
  }
}
</script>