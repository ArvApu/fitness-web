<template>
  <div>

    <div v-for="user in users" :key="user.id">
      {{ user }}
    </div>

  </div>
</template>

<script>

import { mapState, mapActions} from 'vuex';

export default {
  name: 'Clients',
  computed: {
    ...mapState('users', [
      'users'
    ])
  },
  methods: {
    ...mapActions('users', [
      'fetchAll'
    ])
  },
  created() {
    this.fetchAll()
  }
}
</script>