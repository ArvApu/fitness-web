<template>

  <div>

    {{ this.workout }}

    <!--    <form id='exercise-form' @submit.prevent="handle">-->

    <!--      <alerts :errors="errors"/>-->

    <!--      <div class='form-group'>-->
    <!--        <label for="name"> Name </label>-->
    <!--        <input required class='form-input' type="text" id="name" name="name" v-model="exercise.name">-->
    <!--      </div>-->

    <!--      <div class='form-group'>-->
    <!--        <label for="description"> Description </label>-->
    <!--        <textarea required class='form-input-textarea' id="description" name="description" v-model="exercise.description" />-->
    <!--      </div>-->

    <!--      <div class='form-check'>-->
    <!--        <input type="checkbox" id="is_private" name="is_private" v-model="exercise.is_private">-->
    <!--        <label for="is_private"> Exercise is private </label>-->
    <!--      </div>-->

    <!--      <form-submit-button label="Submit"/>-->

    <!--    </form>-->

  </div>

</template>

<script>

import {mapState, mapActions} from "vuex";

export default {
  name: 'LogWorkout',
  computed: {
    ...mapState('exercises', [
      'errors'
    ])
  },
  data() {
    return {
      workout: null,
    }
  },
  methods: {
    ...mapActions('workouts', [
      'fetchOne',
    ]),
    ...mapActions('workoutLogs', [
      'create',
    ]),
  },
  created() {
    this.fetchOne(this.$route.params.id).then(
        result => this.workout = result
    );
  }
}
</script>