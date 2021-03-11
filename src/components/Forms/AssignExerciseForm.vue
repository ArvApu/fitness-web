<template>

<div>

  <div v-if="isChoosingExercise" >

    <div class="exercises-list">
      <div v-for="exercise in exercises" :key="exercise.id" v-on:click="chooseExercise(exercise)"
           :class="{highlight:exercise.id === selected}" class="exercise"
      >
        <span> {{ exercise.id }} {{ exercise.name }} </span>
        <span v-show="exercise.id === selected">
          <font-awesome-icon icon="check"/>
        </span>
      </div>
    </div>

    <button v-on:click="isChoosingExercise = false" :disabled="!selected" class="form-input btn btn-secondary">
      <font-awesome-icon icon="angle-double-right" size="lg"/>
    </button>

  </div>

  <div v-if="isChoosingExercise">

  </div>

  <form v-if="!isChoosingExercise" id='assign-exercise-form' @submit.prevent="handle">

    <alerts :errors="errors"/>

    <div class='form-group' style="margin-right: 12px">
      <label for="sets"> Sets </label>
      <input required class='form-input' type="number" id="sets" name="sets" placeholder="Sets" v-model="assignee.sets">
    </div>

    <div class='form-group' style="margin-right: 12px">
      <label for="reps"> Reps </label>
      <input required class='form-input' type="number" id="reps" name="reps" placeholder="Reps" v-model="assignee.reps">
    </div>

    <div class='form-group' style="margin-right: 12px">
      <label for="rest"> Rest </label>
      <input required class='form-input' type="number" id="rest" name="rest" placeholder="Rest" v-model="assignee.rest">
    </div>

    <div class="buttons" >

      <button v-on:click="isChoosingExercise = true" class="form-input btn btn-secondary">
        <font-awesome-icon icon="angle-double-left" size="lg"/>
      </button>

      <form-submit-button label="Submit"/>
    </div>

  </form>
</div>



</template>

<script>

import {mapState} from "vuex";

export default {
  name: 'AssignExerciseForm',
  props: {
    id: Number,
    name: String,
    sets: Number,
    reps: Number,
    rest: Number,
  },
  computed: {
    ...mapState('exercises', [
      'exercises', 'errors'
    ])
  },
  data() {
    return {
      assignee: {
        id: this.id,
        sets: this.sets,
        reps: this.reps,
        rest: this.rest,
      },
      isChoosingExercise: true,
      selected: null,
    }
  },
  methods: {
    handle() {
      if(this.assignee.id) {
        this.update();
      } else {
        this.create();
      }
    },
    create() {
      this.$store.dispatch('exercises/create', this.assignee)
          .then(() => {
            this.$emit('created')
          });
    },
    update() {
      this.$store.dispatch('exercises/update', this.assignee)
          .then(() => {
            this.$emit('updated')
          });
    },
    cancel() {
      this.$emit('canceled');
    },
    chooseExercise(exercise) {
      this.selected = exercise.id;
    },
  },
  created() {
    this.$store.dispatch('exercises/clearErrors')
    this.$store.dispatch('exercises/fetchAll');
  }
}
</script>

<style >
  #assign-exercise-form .buttons {
    display: flex;
  }

  .exercise {
    height: 40px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #393e46;
    padding: 7px;
    text-transform: capitalize;
  }

  .exercises-list div:last-child {
    border-bottom: none;
  }

  .highlight {
    background: #dbdbdb;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
  }

  .highlight span:last-child {
    color: var(--success-color);
  }

</style>