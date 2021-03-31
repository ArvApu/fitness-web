<template>

<div>

  <form id='assign-exercise-form' @submit.prevent="handle">

    <alerts :errors="errors"/>

    <div class='form-group'>
      <label> Exercise </label>
      <v-select @search="fetchExercises" :appendToBody="true" :filterable="false" :options="exercises"
                label="name" :reduce="exercise => exercise.id" v-model="assignee.id">
        <template #search="{attributes, events}">
          <input class="vs__search" :required="!assignee.id" v-bind="attributes" v-on="events"/>
        </template>
        <li slot="list-footer" class="pagination">
          <button class="btn btn-secondary" @click.prevent="prevPage()" :disabled="!hasPrevPage">Prev</button>
          <button class="btn btn-secondary" @click.prevent="nextPage()" :disabled="!hasNextPage">Next</button>
        </li>
      </v-select>
    </div>

    <div class='form-group'>
      <label for="order"> Order </label>
      <input required class='form-input' type="number" id="order" name="order" placeholder="Order" v-model="assignee.order">
    </div>

    <div class='form-group'>
      <label for="sets"> Sets </label>
      <input required class='form-input' type="number" id="sets" name="sets" placeholder="Sets" v-model="assignee.sets">
    </div>

    <div class='form-group'>
      <label for="reps"> Reps </label>
      <input required class='form-input' type="number" id="reps" name="reps" placeholder="Reps" v-model="assignee.reps">
    </div>

    <div class='form-group'>
      <label for="rest"> Rest </label>
      <input required class='form-input' type="number" id="rest" name="rest" placeholder="Rest" v-model="assignee.rest">
    </div>

    <div class="buttons" >
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
    workoutId: {
      type: Number,
      required: true,
    },
    assignedExercisesCount: {
      type: Number,
      default() { return 0; },
    }
  },
  computed: {
    ...mapState('exercises', [
      'exercises', 'paginator'
    ]),
    ...mapState('workouts', [
       'errors'
    ]),
    hasNextPage () {
      return Boolean(this.paginator.currentPage < this.paginator.lastPage);
    },
    hasPrevPage () {
      return Boolean(this.paginator.currentPage >= this.paginator.lastPage && this.paginator.currentPage !== 1);
    }
  },
  data() {
    return {
      assignee: {
        id: null,
        order: this.assignedExercisesCount + 1,
        sets: null,
        reps: null,
        rest: null,
      },
      exerciseId: null,
    }
  },
  methods: {
    handle() {
      this.$store.dispatch('workouts/assignExercises', {
        id: this.workoutId,
        exercises: [this.assignee]
      }).then(() => {
        this.$emit('created')
      });
    },
    fetchExercises(search, loading) {
      loading(true)
      this.search = !search.length ? null : search;
      this.$store.dispatch('exercises/fetchAll', {
        page: 1, search: search
      }).finally(() => loading(false))
    },
    nextPage() {
      this.$store.dispatch('exercises/fetchAll', {
        page: this.paginator.currentPage + 1, search: this.search
      });
    },
    prevPage() {
      this.$store.dispatch('exercises/fetchAll', {
        page: this.paginator.currentPage - 1, search: this.search
      });
    }
  },
  created() {
    this.$store.dispatch('workouts/clearErrors')
    this.$store.dispatch('exercises/fetchAll', {page: 1});
  }
}
</script>

<style scoped>
  #assign-exercise-form .buttons {
    display: flex;
  }

  .pagination {
    display: flex;
    margin: .25rem .25rem 0;
  }

  .pagination button {
    flex-grow: 1;
  }

  .pagination button:disabled {
    cursor: default;
  }
</style>
