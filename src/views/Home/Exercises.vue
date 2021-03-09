<template>
  <div class="content-box">

    <div>

      <button class="btn btn-primary"> <font-awesome-icon icon="plus"/> Add exercise </button>

      <div class="items">

        <div class="item" v-for="exercise in exercises" :key="exercise.id">

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

<style scoped>
  @import '../../assets/css/items.css';
</style>