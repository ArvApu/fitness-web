<template>
    <form id='exercise-form' @submit.prevent="handle">

      <div class='form-group'>
        <label for="name"> Name </label>
        <input required class='form-input' type="text" id="name" name="name" v-model="exercise.name">
      </div>

      <div class='form-group'>
        <label for="description"> Description </label>
        <textarea required class='form-input-textarea' id="description" name="description" v-model="exercise.description" />
      </div>

      <div class='form-check'>
        <input type="checkbox" id="is_private" name="is_private" v-model="exercise.is_private">
        <label for="is_private"> Exercise is private </label>
      </div>

      <form-submit-button label="Submit"/>

    </form>
</template>

<script>

export default {
  name: 'ExerciseForm',
  props: {
    id: Number,
    name: String,
    description: String,
    is_private: Boolean,
  },
  data() {
    return {
      exercise: {
        id: this.id,
        name: this.name,
        description: this.description,
        is_private: this.is_private ?? false,
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
    },
  }
}
</script>