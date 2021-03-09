<template>
  <div class="content-box">

    <div>

      <button class="btn btn-primary"> Add exercise </button>

      <div class="exercises">

        <div class="exercise" v-for="exercise in exercises" :key="exercise.id">

          <div class="info">

            <h3> {{ exercise.name }} </h3>

            <div class="description">
              {{ exercise.description }}
            </div>
          </div>

          <div class="control">
            <font-awesome-icon class='edit' icon="pen" size="2x" v-on:click="edit(exercise.id)"/>
            <font-awesome-icon class='remove' icon="trash-alt" size="2x" v-on:click="remove(exercise.id)"/>
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
        'fetchAll', 'update', 'delete'
    ]),
    edit(id) {
      // TODO: Open modal window and enter information
      console.log('edit', id);
    },
    remove(id) {
      // TODO: Open modal window to confirm
      this.delete(id);
    },
  },
  created() {
    this.fetchAll()
  }
}
</script>

<style>

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

  .exercise .control .remove:hover {
    color: var(--danger-color);
    cursor: pointer;
  }

  .exercise .control .edit:hover {
    color: var(--primary-color);
    cursor: pointer;
  }

  @media only screen and (max-width: 1440px) {
    .exercise {
      margin: 1rem 0.2em;
      height: 155px;
    }
  }

  @media only screen and (max-width: 1220px) {
    .exercises {
      flex-direction: column;
    }
  }

  @media only screen and (max-width: 860px) {
    .exercises {
      flex-direction: column;
    }
  }

  @media only screen and (max-width: 500px) {

    .exercise {
      flex-direction: column;
    }

    .exercise .info {
      width: 100%;
      border-bottom: 2px solid #999999;
      border-right: none;
    }

    .exercise .control {
      flex-direction: row;
      padding: 7px 0;
      width: 100%;
    }
  }

</style>