<template>
  <div class="workout-stats">
    <div class='form-group'>
      <label> Workout statistics </label>
      <v-select @search="fetchWorkouts" v-on:option:selected="reLoadStats" :appendToBody="false" :filterable="false" :options="workouts" label="name" :reduce="workout => workout.id" v-model="workoutId">
        <li slot="list-footer" class="pagination">
          <button class="btn btn-secondary" @click.prevent="prevPage()" :disabled="!hasPrevPage">Prev</button>
          <button class="btn btn-secondary" @click.prevent="nextPage()" :disabled="!hasNextPage">Next</button>
        </li>
      </v-select>
    </div>

    <div v-if="workoutId && isEnoughData">
      <doughnut-chart v-if="chart.loaded" :chartdata="chart.chartdata" :options="chart.options"/>
    </div>

    <empty v-else/>

  </div>
</template>

<script>

import {mapState} from "vuex";
import DoughnutChart from "@/components/Charts/DoughnutChart";
import Empty from "@/components/Statistics/Empty";

export default {
  name: 'Workout',
  components: {
    DoughnutChart,
    Empty
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
      isEnoughData: false,
      colors: ['#e20a60', '#FFA500','#20b2aa', '#9fff9f'],
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

        this.isEnoughData = data.missed > 0 || data.interrupted > 0 || data.completed > 0;

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

<style scoped>
  .workout-stats {
    height: 480px;
  }
</style>