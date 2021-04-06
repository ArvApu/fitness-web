<template>

  <div>
    Statistics page

    <doughnut-chart v-if="getChartLoadedStatus(0)" :chartdata="getChartData(0)" :options="getChartOptions(0)"/>
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
      colors: ['#ff6384', '#36a2eb', '#ffce56', '#20B2AA', '#FFA500','#B0171F','#C1FFC1', '#90EE90'],
      charts: [
        {
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
      ],
    }
  },
  methods: {
    ...mapActions('statistics', [
        'workouts', 'workout', 'weight', 'exercises', 'exercise'
    ]),
    getChartLoadedStatus(id) {
      return this.getChart(id).loaded;
    },
    getChartData(id) {
      return this.getChart(id).chartdata;
    },
    getChartOptions(id) {
      return this.getChart(id).options;
    },
    getChart(id){
      return this.charts[id];
    }
  },
  created() {
    this.workouts({userId: this.clientId}).then((data) => {
      let chart = this.charts[0];

      chart.chartdata = {
        datasets: [{
          data: [data.missed, data.interrupted, data.completed],
          backgroundColor: this.colors,
        }],
        labels: ['missed', 'interrupted', 'completed']
      }

      chart.loaded = true;
    });
  }
}
</script>

<style scoped>

</style>