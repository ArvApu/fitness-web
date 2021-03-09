<template>
  <div class="content-box">

    <div>

      <button class="btn btn-primary"> Add exercise </button>

      <div class="exercises">

        <div class="exercise" v-for="exercise in exercises" :key="exercise.id">

          <div class="info">

            <h3> {{ exercise.name }} </h3>

            <div class="description">
              <!--            {{ exercise.description }}-->
              error sit quia labore sit ut et consectetur vero excepturi  error sit quia labore sit ut et consectetur vero excepturi error sit quia labore sit ut et consectetur vero excepturi error sit quia labore sit ut et consectetur vero excepturi error sit quia lab
            </div>
          </div>

          <div class="control">
            <font-awesome-icon icon="pen" size="2x"/>
            <font-awesome-icon icon="trash-alt" size="2x"/>

<!--            <div>-->
<!--              <font-awesome-icon icon="pen" />-->
<!--            </div>-->

<!--            <div>-->
<!--              <font-awesome-icon icon="trash-alt" />-->
<!--            </div>-->
            <!--          {{ exercise.id }}-->
          </div>

        </div>
      </div>

    </div>

  </div>
</template>

<script>

import { mapState, mapActions} from 'vuex';

export default {
  name: 'Exercises',
  data() {
    return {
      name: null,
      description: null,
      is_private: false,
    }
  },
  computed: {
    ...mapState('exercises', [
      'exercises'
    ])
  },
  methods: {
    ...mapActions('exercises', [
        'fetchAll'
    ])
  },
  created() {
    this.fetchAll()
  }
}
</script>

<style scoped>

  .exercises {
    display: flex;
    flex-wrap: wrap;
  }

  .exercise {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    box-sizing: border-box;
    margin: 1rem 0.6em;
    flex: 0 1 48%;
    transition: 0.3s;
    height: 130px;
    padding: 7px;
    display: flex;
  }

  .exercise h3 {
    padding: 0;
    margin: 0;
  }

  .exercise .info {
    width: 90%;
    padding: 5px;
    border-right: 2px solid #999999;
  }

  .exercise .info .description {
    margin: 10px 0;
  }

  .exercise .control {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    width: 10%;
  }
</style>