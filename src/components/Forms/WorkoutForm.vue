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
            <option disabled selected value="none">Please select a type</option>
            <option v-for="type in types" :key="type">{{ type }}</option>
          </select>
        </div>
      </div>

      <form-submit-button label="Submit" :processing="isLoading"/>

    </form>
</template>

<script>

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
  computed: {
    ...mapState('workouts', [
      'errors'
    ])
  },
  data() {
    return {
      isLoading: false,
      types: ['general', 'cardio', 'hiit', 'weight', 'recovery'],
      workout: {
        id: this.id,
        name: this.name,
        description: this.description,
        type: this.type ?? 'none',
      },
    }
  },
  methods: {
    handle() {
      this.isLoading = true;
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
          }).finally(() => {
            this.isLoading = false;
      });
    },
    update() {
      this.$store.dispatch('workouts/update', this.workout)
          .then((updated) => {
            this.$emit('updated', updated)
          }).finally(() => {
            this.isLoading = false;
      });
    },
  },
  created() {
    this.$store.dispatch('workouts/clearErrors')
  }
}
</script>