<template>
  <div>

    {{ exercises }}

  </div>
</template>

<script>

import { mapState, mapActions} from 'vuex';

export default {
  computed: {
    ...mapState('exercises', [
      'exercises'
    ])
  },
  methods: {
    ...mapActions('exercises', [
        'fetchExercises'
    ]),
  },
  created() {
    this.fetchExercises()
  }
}
</script>