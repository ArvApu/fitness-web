<template>
  <div>

    <div v-for="workout in workouts" :key="workout.id">
      {{ workout }}
    </div>

  </div>
</template>

<script>

import { mapState, mapActions} from 'vuex';

export default {
  name: 'Workouts',
  data() {
    return {
      name: null,
      description: null,
      is_private: false,
    }
  },
  computed: {
    ...mapState('workouts', [
      'workouts'
    ])
  },
  methods: {
    ...mapActions('workouts', [
      'fetchAll'
    ])
  },
  created() {
    this.fetchAll()
  }
}
</script>