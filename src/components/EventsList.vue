<template>
  <div>

    <div class="header">
      {{ header }}
    </div>

    <div class="event no-highlight-select" v-for="event in events" :key="event.id" v-on:click="goToEvent(event)">
      <div class="event-title"> {{ event.title }} </div>
      <div class="event-attendee"> <small><b>Attendee:</b> {{ event.attendee.full_name }}</small></div>
    </div>

    <div class="empty-events-list-dialog" v-if="events.length === 0">
      No events
    </div>

  </div>
</template>

<script>
export default {
  name: 'EventsList',
  props: {
    header: String,
    events: Array,
  },
  methods: {
    goToEvent(event) {
      this.$store.commit('auth/SET_CLIENT_ID', event.attendee.id);
      this.$store.commit('auth/SET_CLIENT_NAME', event.attendee.full_name);
      this.$router.push({name: 'Event', params: {id: event.id}})
    }
  }
}
</script>

<style scoped>
  .header {
    border-bottom: 2px solid #999999;
    padding-bottom: 5px;
    margin-bottom: 10px;
  }

  .event {
    display: flex;
    flex-direction: column;
    background: #f3f3f3;
    margin-bottom: 10px;
    padding: 7px;
    border-radius: 5px;
    border-bottom: 2px solid transparent;
    transition: border-color 400ms, background 200ms;
  }

  .event:hover {
    cursor: pointer;
  }

  .event-attendee {
    margin-top: 7px;
  }

  .event:hover {
    border-color: var(--primary-color);
    background: #efefef;
  }

  .empty-events-list-dialog {
    font-style: italic;
    padding: 10px 0;
    margin-bottom: 5px;
  }

</style>