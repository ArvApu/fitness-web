<template>
  <div class="stats-box">
    <span>Total number of exercises done: <b>{{ data.total_sets_done }}</b></span>
    <span>Total number of sets done: <b>{{ data.total_exercises_done }}</b></span>
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
    width: 100%;
    padding: 10px 10px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.16) 0 3px 6px, rgba(0, 0, 0, 0.23) 0 3px 6px;
  }

  .stats-box span {
    margin-right: 10px;
    font-size: 20px;
    padding-right: 10px;
    border-right: 2px solid #999999;
  }

  .stats-box span:last-child {
    border-right: none;
  }

</style>