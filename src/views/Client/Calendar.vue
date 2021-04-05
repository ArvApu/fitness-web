<template>

  <div class="calendar">

    <div class="cal-btn">
      <button v-if="canAddEvent" class="btn btn-primary" v-on:click="show"> <font-awesome-icon icon="plus"/> Add event </button>
      <button class="btn btn-secondary" v-on:click="handleExport">
        <font-awesome-icon icon="file-export"/> Export upcoming events
      </button>
    </div>

    <div class="calendar-box">
      <full-calendar ref="fullCalendar" :options="calendarOptions" />
    </div>

    <div class="events-box">
      <div class="event" v-for="event in events" :key="event.id">
        <h3> {{ event.title }}</h3>

        <div v-if="event.all_day">
          <p> All day </p>
        </div>
        <div v-else class="from-to">
          <p> <b>From:</b> {{ event.start_time }}</p>
          <p> <b>To:</b> {{ event.end_time }}</p>
        </div>

        <div class="control">
          <font-awesome-icon class='view' icon="eye" size="lg" v-on:click="view(event.id)"/>
        </div>

      </div>
    </div>

    <!-- MODALS -->
    <v-dialog/>

    <modal class="force-scroll-modal" name="add-event-modal" :width=800 :height="'auto'" :adaptive=true :scrollable=true>
      <div class="modal-from">
        <event-form @created="hide"/>
      </div>
    </modal>
  </div>

</template>

<script>

import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import {mapActions, mapState} from "vuex";
import EventForm from "@/components/Forms/EventForm";

export default {
  name: 'Calendar',
  components: {
    FullCalendar,
    EventForm,
  },
  data() {
    return {
      userId: this.$store.state.auth.clientId || this.$store.state.auth.user_id,
      canAddEvent: this.$store.state.auth.user && ['admin', 'trainer'].includes(this.$store.state.auth.user.role),
      calendarOptions: {
        plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        editable: true,
        firstDay: 1,
        dateClick: this.handleDateClick,
        eventClick: this.handleEventClick,
        datesSet: this.handleDateChange,
        events: this.events,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridDay'
        },
        eventTimeFormat: {
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false
        },
      }
    }
  },
  computed: {
    ...mapState('events', [
        'events'
    ])
  },
  methods: {
    ...mapActions('events', [
        'fetchAll', 'export'
    ]),
    handleDateClick(arg) {
      let calendarApi = arg.view.calendar;
      calendarApi.changeView('timeGridDay', arg.dateStr);
    },
    handleEventClick(arg) {
      this.view(arg.event.id);
    },
    handleDateChange(arg) {
      this.fetchAll({userId: this.userId, start: arg.startStr.substring(0, 10), end: arg.endStr.substring(0, 10)}).then(() => {
        let calendarApi = this.$refs.fullCalendar.getApi()
        calendarApi.removeAllEvents();
        for(const e of this.events) {
          calendarApi.addEvent({
            id: e.id,
            title: e.title,
            start: e.start_time,
            end: e.end_time,
            allDay: e.all_day,
          });
        }
      });

    },
    show () {
      this.$modal.show('add-event-modal');
    },
    hide (result) {
      if(result) {
        let calendarApi = this.$refs.fullCalendar.getApi();
        calendarApi.addEvent(result);
      }
      this.$modal.hide('add-event-modal');
    },
    handleExport() {
      this.export(this.userId);
    },
    view(id) {
      this.$router.push({ name: 'Event', params: {id: id} })
    },
  },
}
</script>

<style>
  @import '../../assets/css/calendar.css';
</style>