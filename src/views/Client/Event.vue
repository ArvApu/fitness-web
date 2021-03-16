<template>

  <div>
    {{event}}

    <div v-if="canControl">
      <button v-on:click="edit" class="btn btn-secondary"> Edit </button>
      <button v-on:click="remove" class="btn btn-danger"> Remove </button>
    </div>

    <!-- MODALS -->
    <v-dialog/>

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
      canControl: ['trainer', 'admin'].includes(this.$store.state.auth.user.role),
    }
  },
  methods: {
    ...mapActions('events', [
      'fetchOne', 'delete'
    ]),
    edit() {
      console.log('edit');
    },
    remove() {
      this.$modal.show('dialog', {
        title: 'WARNING',
        text: 'Are you sure you want to delete this event?',
        buttons: [
          {
            title: 'Cancel',
            handler: () => {
              this.$modal.hide('dialog');
            }
          },
          {
            title: 'Yes',
            handler: () => {
              this.$modal.hide('dialog');
              this.delete(this.id).then(() => this.$router.push({ name: 'Calendar'}));
            }
          },
        ]
      })
    },
  },
  created() {
    this.fetchOne(this.id).then((result) => {
      this.event = result;
    }).catch(() => {
      this.$router.back();
    });
  }
}
</script>


<style scoped>

</style>