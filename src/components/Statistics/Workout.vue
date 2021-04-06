<template>
  <div>

    <div class='form-group'>
      <label> Workout statistics </label>
      <v-select @search="fetchWorkouts" v-on:option:selected="reLoadStats" :appendToBody="false" :filterable="false" :options="workouts" label="name" :reduce="workout => workout.id" v-model="workoutId">
        <li slot="list-footer" class="pagination">
          <button class="btn btn-secondary" @click.prevent="prevPage()" :disabled="!hasPrevPage">Prev</button>
          <button class="btn btn-secondary" @click.prevent="nextPage()" :disabled="!hasNextPage">Next</button>
        </li>
      </v-select>
    </div>

    <doughnut-chart v-if="chart.loaded" :chartdata="chart.chartdata" :options="chart.options"/>
  </div>
</template>

<script>

import {mapState} from "vuex";
import DoughnutChart from "@/components/Charts/DoughnutChart";

export default {
  name: 'Workouts',
  components: {
    DoughnutChart
  },
  computed: {
    ...mapState('workouts', [
      'workouts', 'paginator'
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
      workoutId: null,
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
        },
      },
    }
  },
  methods: {
    fetchWorkouts(search, loading) {
      loading(true)
      this.search = !search.length ? null : search;
      this.$store.dispatch('workouts/fetchAll', {
        page: 1, search: search
      }).finally(() => loading(false))
    },
    nextPage() {
      this.$store.dispatch('workouts/fetchAll', {
        page: this.paginator.currentPage + 1, search: this.search
      });
    },
    prevPage() {
      this.$store.dispatch('workouts/fetchAll', {
        page: this.paginator.currentPage - 1, search: this.search
      });
    },
    reLoadStats() {
      this.chart.loaded = false;
      const payload = {id: this.workoutId, userId: this.clientId};

      this.$store.dispatch('statistics/workout', payload).then((data) => {
        this.chart.chartdata = {
          datasets: [{
            data: [data.missed, data.interrupted, data.completed],
            backgroundColor: this.colors,
          }],
          labels: ['missed', 'interrupted', 'completed']
        }

        this.chart.loaded = true;
      })
    }
  },
  created() {
    this.$store.dispatch('workouts/fetchAll', {page: 1})
  }
}
</script>

<style scoped lang="css" src="../../assets/css/paginate-select.css"/>