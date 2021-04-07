<template>
  <div class="stats-box">
    <span>Total number of exercises done: {{ data.total_sets_done }}</span>
    <span>Total number of sets done: {{ data.total_exercises_done }}</span>
  </div>
</template>

<script>
export default {
  name: 'Exercises',
  data() {
    return {
      clientId: this.$store.state.auth.clientId,
      data: [],
    }
  },
  created() {
    this.$store.dispatch('statistics/exercises', {userId: this.clientId}).then((data) => {
      this.data = data;
    });
  }
}
</script>

<style scoped>
  .stats-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.16) 0 3px 6px, rgba(0, 0, 0, 0.23) 0 3px 6px;
  }
</style>