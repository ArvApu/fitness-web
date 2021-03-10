<template>
  <div class="content-box">

    {{ workout }}

  </div>
</template>

<script>

import { mapState, mapActions} from 'vuex';

export default {
  name: 'Workout',
  data() {
    return {
      workout: null,
    }
  },
  computed: {
    ...mapState('workouts', [
      'errors'
    ])
  },
  methods: {
    ...mapActions('workouts', [
      'fetchOne',
    ]),
  },
  created() {
    this.fetchOne(this.$route.params.id).then(
        result => this.workout = result
    );
  }
}
</script>

<style scoped>

</style>