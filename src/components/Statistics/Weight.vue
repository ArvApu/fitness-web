<template>
  <div>
    <line-chart v-if="chart.loaded" :chartdata="chart.chartdata" :options="chart.options"/>
  </div>
</template>

<script>
import LineChart from "@/components/Charts/LineChart";

export default {
  name: 'Weight',
  components: {
    LineChart
  },
  data() {
    return {
      clientId: this.$store.state.auth.clientId,
      chart: {
        loaded: false,
        chartdata: {},
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false
          },
        },
      },
    }
  },
  created() {
    const payload = {userId: this.clientId};

    this.$store.dispatch('statistics/weight', payload).then((data) => {

      const labels = data.map(function (value) {
        return value.created_at;
      });

      const chartData = data.map(function (value) {
        return value.weight;
      });

      this.chart.chartdata = {
        labels: labels,
        datasets: [
          {
            backgroundColor: '#36a2eb',
            data: chartData
          },
        ]
      }

      this.chart.loaded = true;
    });
  }
}
</script>

<style scoped lang="css" src="../../assets/css/paginate-select.css"/>