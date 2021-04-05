<template>

<div class="content-box">
  <div v-if="isLoadingNews || isLoadingEvents">
    <page-loading-ring/>
  </div>

  <div class="overview" v-else>

    <div class="news">

      <h3> News feed </h3>

      <div class="news-event" v-for="newsEvent in news" :key="newsEvent.id">
        <div class="news-content"> {{ newsEvent.content }}</div>
        <div class="news-date"> {{ getDisplayDate(newsEvent.created_at) }} </div>
      </div>
    </div>

    <div class="events">

      <h3> Upcoming events</h3>

      <events-list :events="todayEvents" header="Today"/>
      <events-list :events="tomorrowEvents" header="Tomorrow"/>
    </div>

    <div class="events-mobile" v-if="showMobileEvents && eventsCount > 0">
      <events-list :events="todayEvents" header="Today"/>
      <events-list :events="tomorrowEvents" header="Tomorrow"/>
    </div>

    <div class="events-mobile-switch">
      <button class="btn btn-primary" v-on:click="showMobileEvents = !showMobileEvents">
        There <span  v-if="eventsCount > 0">are</span><span v-else>is</span> {{ eventsCount }} upcoming event<span v-if="eventsCount !== 1">s</span> <span v-if="eventsCount > 0">&#9660;</span>
      </button>
    </div>

  </div>
</div>


</template>

<script>
import {mapActions, mapState} from "vuex";
import EventsList from "@/components/EventsList";
import PageLoadingRing from "@/components/PageLoadingRing";

export default {
  name: 'Overview',
  components: {
    EventsList,
    PageLoadingRing
  },
  computed: {
    eventsCount() {
      return this.todayEvents.length + this.tomorrowEvents.length;
    },
    ...mapState('news', [
      'news', 'paginator'
    ])
  },
  methods: {
    ...mapActions('events', {
      fetchEvents: 'fetchAllForTrainer'
    }),
    ...mapActions('news', {
      fetchNews: 'fetchAll'
    }),
    getDisplayDate(date) {

      const fullDate = new Date(date);

      const today = new Date();
      today.setHours(0);
      today.setMinutes(0);
      today.setSeconds(0);
      today.setMilliseconds(0);

      const compDate = new Date(date.substring(0, 10));
      compDate.setHours(0);
      compDate.setMinutes(0);
      compDate.setSeconds(0);
      compDate.setMilliseconds(0);

      const diff = today.getTime() - compDate.getTime();

      if (compDate.getTime() === today.getTime()) {
        return 'Today at ' + fullDate.getHours() + ':' + fullDate.getMinutes();
      } else if (diff <= (24 * 60 * 60 * 1000)) {
        return 'Yesterday at ' + fullDate.getHours() + ':' + fullDate.getMinutes();
      } else {
        return date.substring(0, 10) + ' at ' + fullDate.getHours() + ':' + fullDate.getMinutes();
      }
    }
  },
  data() {
    return {
      isLoadingNews: true,
      isLoadingEvents: true,
      showMobileEvents: false,
      todayEvents: [],
      tomorrowEvents: [],
    }
  },
  created() {
    this.fetchNews(1).finally(() => {
      this.isLoadingNews = false;
    })

    const today  = new Date().toISOString().slice(0, 10);
    let tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);
    tomorrow = tomorrow.toISOString().slice(0, 10);

    this.fetchEvents({start: today, end: today,}).then((events) => {
      this.todayEvents = events;
    })

    this.fetchEvents({start: tomorrow, end: tomorrow,}).then((events) => {
      this.tomorrowEvents = events;
    }).finally(() => {
      this.isLoadingEvents = false;
    })
  }
}

</script>

<style scoped>
  @import '../../assets/css/overview.css';
</style>