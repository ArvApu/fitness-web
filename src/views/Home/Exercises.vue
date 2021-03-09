<template>
  <div>

    <button ></button>

    <div v-for="exercise in exercises" :key="exercise.id">

<!--      class="form-input btn btn-primary"-->

      {{ exercise.id }}
      {{ exercise.name }}
      {{ exercise.description }}
      {{ exercise.is_private }}
    </div>

  </div>
</template>

<script>

import { mapState, mapActions} from 'vuex';

export default {
  name: 'Exercises',
  data() {
    return {
      name: null,
      description: null,
      is_private: false,
    }
  },
  computed: {
    ...mapState('exercises', [
      'exercises'
    ])
  },
  methods: {
    ...mapActions('exercises', [
        'fetchAll'
    ])
  },
  created() {
    this.fetchAll()
  }
}
</script>