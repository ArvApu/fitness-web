<template>
  <div>

    <div class="header">
      {{ header }}
    </div>

    <div class="event no-highlight-select" v-for="event in events" :key="event.id" v-on:click="goToEvent(event.id)">
      <div class="event-title"> {{ event.title }} </div>
      <div class="event-attendee"> <small><b>Attendee:</b> {{ event.attendee.full_name }}</small></div>
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
    goToEvent(id) {
      this.$router.push({name: 'Event', params: {id: id}})
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

</style>