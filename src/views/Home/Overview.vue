<template>

<div class="content-box">
  <div v-if="isLoadingNews || isLoadingEvents">
    <page-loading-ring/>
  </div>

  <div class="overview" v-else>

    <div class="news" v-on:scroll="onScroll" ref="news">

      <h3> News feed </h3>

      <div class="news-event" v-for="newsEvent in news" :key="newsEvent.id">
        <div class="news-content"> {{ newsEvent.content }}</div>
        <div class="news-date"> {{ getDisplayDate(newsEvent.created_at) }} </div>
      </div>

      <div v-if="news.length === 0" class="empty-news-dialog">
        News feed is empty.
      </div>

    </div>

    <div class="events">

      <h3> Upcoming events</h3>

      <events-list :events="todayEvents" header="Today"/>
      <events-list :events="tomorrowEvents" header="Tomorrow"/>
    </div>

    <transition name="slide-fade">
      <div class="events-mobile" v-if="showMobileEvents && eventsCount > 0">
        <events-list :events="todayEvents" header="Today"/>
        <events-list :events="tomorrowEvents" header="Tomorrow"/>
      </div>
    </transition>

    <div class="events-mobile-switch">
      <button class="btn btn-primary" v-on:click="showMobileEvents = !showMobileEvents">
        There <span  v-if="eventsCount === 1">is</span><span v-else>are</span> {{ eventsCount }} upcoming event<span v-if="eventsCount !== 1">s</span> <span v-if="eventsCount > 0">&#9660;</span>
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
        return 'Today at ' + date.substring(11, 16);
      } else if (diff <= (24 * 60 * 60 * 1000)) {
        return 'Yesterday at ' + date.substring(11, 16);
      } else {
        return date.substring(0, 10) + ' at ' + date.substring(11, 16);
      }
    },
    onScroll ({ target: { scrollTop, clientHeight, scrollHeight }}) {
      if ((scrollTop + clientHeight >= scrollHeight) && this.paginator.currentPage < this.paginator.lastPage) {
        this.fetchNews({
          page: this.paginator.currentPage + 1,
          add: true
        });
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
    this.fetchNews({page: 1, add: false}).finally(() => {
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

<style scoped lang="css" src="../../assets/css/overview.css"/>