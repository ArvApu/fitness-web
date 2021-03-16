<template>

  <div>
    {{event}}
  </div>

</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'Event',
  data() {
    return {
      id: this.$route.params.id,
      event: null,
    }
  },
  methods: {
    ...mapActions('events', [
      'fetchOne'
    ])
  },
  created() {
    this.fetchOne(this.id).then((result) => {
      this.event = result;
    })
  }
}
</script>


<style scoped>

</style>