<template>
  <div>
    <doughnut-chart v-if="chart.loaded" :chartdata="chart.chartdata" :options="chart.options"/>
  </div>
</template>

<script>
import DoughnutChart from "@/components/Charts/DoughnutChart";

export default {
  name: 'Workouts',
  components: {
    DoughnutChart
  },
  data() {
    return {
      clientId: this.$store.state.auth.clientId,
      colors: ['#ff6384', '#36a2eb', '#ffce56', '#20B2AA', '#FFA500','#B0171F','#C1FFC1', '#90EE90'],
      chart: {
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
      },
    }
  },
  created() {
    this.$store.dispatch('statistics/workouts', {userId: this.clientId}).then((data) => {
      this.chart.chartdata = {
        datasets: [{
          data: [data.missed, data.interrupted, data.completed],
          backgroundColor: this.colors,
        }],
        labels: ['missed', 'interrupted', 'completed']
      }

      this.chart.loaded = true;
    });
  }
}
</script>

<style scoped>

</style>