<template>
  <div class="content-box">

    <div>

      <button class="btn btn-primary"> <font-awesome-icon icon="plus"/> Add workout </button>

      <div class="items">

        <div class="item" v-for="workout in workouts" :key="workout.id">

          <div class="info">

            <h3> {{ workout.name }} </h3>

            <div class="description">
              {{ workout.description }}
            </div>
          </div>

          <div class="control">
            <font-awesome-icon class='view' icon="eye" size="lg" v-on:click="view(workout.id)"/>
            <font-awesome-icon class='edit' icon="pen" size="lg" v-on:click="edit(workout.id)"/>
            <font-awesome-icon class='remove' icon="trash-alt" size="lg" v-on:click="remove(workout.id)"/>
          </div>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
import { mapState, mapActions} from 'vuex';

export default {
  name: 'Workouts',
  data() {
    return {
      name: null,
      description: null,
      is_private: false,
    }
  },
  computed: {
    ...mapState('workouts', [
      'workouts'
    ])
  },
  methods: {
    ...mapActions('workouts', [
      'fetchAll'
    ])
  },
  created() {
    this.fetchAll()
  }
}
</script>

<style scoped>
  @import '../../assets/css/items.css';
</style>