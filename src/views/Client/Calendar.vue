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

  .calendar {
    margin: 0 100px;
  }
  .calendar-box {
    margin: 20px 0;
  }

  .cal-btn button:first-child {
    margin-right: 10px;
  }

  .events-box {
    display: none;
  }

  @media only screen and (max-width: 1120px) {
    .calendar {
      margin: 0;
    }
  }

  @media only screen and (max-width: 620px) {
    .calendar-box .fc-view-harness {
      display: none;
    }

    .fc-toolbar-chunk:last-child {
      display: none !important;
    }

    .events-box {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
    }

    .event {
      border: 1px solid #999999;
      border-radius: 7px;
      box-sizing: border-box;
      margin: 1rem 0.6em 1rem 0.3em;
      flex: 0 1 48%;
      transition: 0.3s;
      height: 130px;
      padding: 7px;
      display: flex;
      flex-direction: column;
    }

    .event h3 {
      margin: 0;
    }

    .event .from-to {
      display: flex;
      justify-content: space-between;
    }

    .event .control {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;
      border-top: solid 1px #999999;
      padding-top: 5px;
      width: 100%;
    }
  }

  @media only screen and (max-width: 390px) {
    .cal-btn button:first-child {
      margin-right: 0;
      margin-bottom: 10px;
    }

    .cal-btn {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .fc-toolbar-chunk {
      display: flex;
      padding: 5px;
      justify-content: space-between;
    }

    .fc-toolbar-title {
      font-size: 20px !important;
    }

    .event .from-to {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    .event .from-to p:last-child {
      margin: 0;
    }
  }

</style>