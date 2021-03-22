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
      <div v-for="event in events" :key="event.id">
        {{ event }}
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
      this.$router.push({ name: 'Event', params: {id: arg.event.id} })
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
    }
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
      padding-top: 20px;
      display: flex;
      flex-direction: column;
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
  }

</style>