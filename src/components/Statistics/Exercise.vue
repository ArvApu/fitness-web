<template>
  <div>

    <div class='form-group'>
      <label> Exercise statistics </label>
      <v-select @search="fetchExercises" v-on:option:selected="reLoadStats" :appendToBody="false" :filterable="false" :options="exercises" label="name" :reduce="exercise => exercise.id" v-model="exerciseId">
        <li slot="list-footer" class="pagination">
          <button class="btn btn-secondary" @click.prevent="prevPage()" :disabled="!hasPrevPage">Prev</button>
          <button class="btn btn-secondary" @click.prevent="nextPage()" :disabled="!hasNextPage">Next</button>
        </li>
      </v-select>
    </div>

    <div v-if="exerciseId && isEnoughData">
      <line-chart v-if="chart.loaded" :chartdata="chart.chartdata" :options="chart.options"/>
    </div>

    <empty v-else/>

  </div>
</template>

<script>

import {mapState} from "vuex";
import LineChart from "@/components/Charts/LineChart";
import Empty from "@/components/Statistics/Empty";

export default {
  name: 'Exercise',
  components: {
    LineChart,
    Empty
  },
  computed: {
    ...mapState('exercises', [
      'exercises', 'paginator'
    ]),
    hasNextPage () {
      return Boolean(this.paginator.currentPage < this.paginator.lastPage);
    },
    hasPrevPage () {
      return Boolean(this.paginator.currentPage >= this.paginator.lastPage && this.paginator.currentPage !== 1);
    }
  },
  data() {
    return {
      clientId: this.$store.state.auth.clientId,
      exerciseId: null,
      isEnoughData: false,
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
  methods: {
    fetchExercises(search, loading) {
      loading(true)
      this.search = !search.length ? null : search;
      this.$store.dispatch('exercises/fetchAll', {
        page: 1, search: search
      }).finally(() => loading(false))
    },
    nextPage() {
      this.$store.dispatch('exercises/fetchAll', {
        page: this.paginator.currentPage + 1, search: this.search
      });
    },
    prevPage() {
      this.$store.dispatch('exercises/fetchAll', {
        page: this.paginator.currentPage - 1, search: this.search
      });
    },
    reLoadStats() {
      this.chart.loaded = false;
      const payload = {id: this.exerciseId, userId: this.clientId};

      this.$store.dispatch('statistics/exercise', payload).then((data) => {

        const labels = data.measurement_values.map(function (value) {
          return value.created_at.slice(0, 10);
        });

        const chartData = data.measurement_values.map(function (value) {
          return value.measurement_value;
        });

        this.isEnoughData = chartData.length >= 2;

        this.chart.chartdata = {
          labels: labels,
          datasets: [
            {
              backgroundColor: '#B0171F',
              data: chartData
            },
          ]
        }

        this.chart.loaded = true;
      });
    }
  },
  created() {
    this.$store.dispatch('exercises/fetchAll', {page: 1})
  }
}
</script>

<style scoped lang="css" src="../../assets/css/paginate-select.css"/>