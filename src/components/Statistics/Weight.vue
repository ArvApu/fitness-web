<template>
  <div>
    <div v-if="isEnoughData">
      <line-chart v-if="chart.loaded" :chartdata="chart.chartdata" :options="chart.options"/>
    </div>

    <empty v-else text="No weight data."/>

  </div>
</template>

<script>
import LineChart from "@/components/Charts/LineChart";
import Empty from "@/components/Statistics/Empty";

export default {
  name: 'Weight',
  components: {
    LineChart,
    Empty
  },
  data() {
    return {
      isEnoughData: false,
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
        return value.created_at.slice(0, 10);
      });

      const chartData = data.map(function (value) {
        return value.weight;
      });

      this.isEnoughData = chartData.length >= 2;

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