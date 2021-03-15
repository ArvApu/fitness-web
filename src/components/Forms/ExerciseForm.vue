<template>
    <form id='exercise-form' @submit.prevent="handle">

      <alerts :errors="errors"/>

      <div class='form-group'>
        <label for="name"> Name </label>
        <input required class='form-input' type="text" id="name" name="name" v-model="exercise.name">
      </div>

      <div class='form-group'>
        <label for="description"> Description </label>
        <textarea required class='form-input-textarea' id="description" name="description" v-model="exercise.description" />
      </div>

      <form-submit-button label="Submit"/>

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
  },
  computed: {
    ...mapState('exercises', [
      'errors'
    ])
  },
  data() {
    return {
      exercise: {
        id: this.id,
        name: this.name,
        description: this.description,
      },
    }
  },
  methods: {
    handle() {
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
          });
    },
    update() {
      this.$store.dispatch('exercises/update', this.exercise)
          .then(() => {
            this.$emit('updated')
          });
    }
  },
  created() {
    this.$store.dispatch('exercises/clearErrors')
  }
}
</script>