<template>

  <div>
    Statistics page

    <doughnut-chart v-if="this.loaded" :chartdata="this.chartdata" :options="this.options"/>
  </div>

</template>

<script>
import DoughnutChart from "@/components/Charts/DoughnutChart";
import {mapActions} from "vuex";

export default {
  name: 'Statistics',
  components: {
    DoughnutChart
  },
  data() {
    return {
      clientId: this.$store.state.auth.clientId,
      colors: ['#ff6384', '#36a2eb', '#ffce56', '#20B2AA',
        '#FFA500','#B0171F','#C1FFC1', '#90EE90'],

      // TODO: add charts to array
      loaded: false,
      chartdata: {},
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Workouts'
        }
      },
    }
  },
  methods: {
    ...mapActions('statistics', [
        'workouts', 'workout', 'weight', 'exercises', 'exercise'
    ])
  },
  created() {
    this.workouts({userId: this.clientId}).then((data) => {

      this.chartdata = {
        datasets: [{
          data: [data.missed, data.interrupted, data.completed],
          backgroundColor: this.colors,
        }],
        labels: ['missed', 'interrupted', 'completed']
      }

      this.loaded = true;
    });
  }
}
</script>

<style scoped>

</style>