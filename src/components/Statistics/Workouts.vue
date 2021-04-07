<template>
  <div>
    <div v-if="isEnoughData">
      <doughnut-chart v-if="chart.loaded" :chartdata="chart.chartdata" :options="chart.options"/>
    </div>

    <empty v-else text="No workouts data."/>

  </div>
</template>

<script>
import DoughnutChart from "@/components/Charts/DoughnutChart";
import Empty from "@/components/Statistics/Empty";

export default {
  name: 'Workouts',
  components: {
    DoughnutChart,
    Empty
  },
  data() {
    return {
      isEnoughData: false,
      clientId: this.$store.state.auth.clientId,
      colors: ['#ff6384', '#36a2eb', '#ffce56', '#20B2AA'],
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

      this.isEnoughData = data.missed > 0 || data.interrupted > 0 || data.completed > 0;

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