<template>

  <div class="calendar">
    <button v-if="canAddEvent" class="btn btn-primary form-input" v-on:click="show"> <font-awesome-icon icon="plus"/> Add event </button>

    <div class="calendar-box">
      <full-calendar ref="fullCalendar" :options="calendarOptions" />
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
        'fetchAll'
    ]),
    handleDateClick(arg) {
      let calendarApi = arg.view.calendar;
      calendarApi.changeView('timeGridDay', arg.dateStr);
    },
    handleEventClick(arg) {
      this.$router.push({ name: 'Event', params: {id: arg.event.id} })
    },
    handleDateChange(arg) {
      this.fetchAll({start: arg.startStr.substring(0, 10), end: arg.endStr.substring(0, 10)}).then(() => {
        let calendarApi = this.$refs.fullCalendar.getApi()
        calendarApi.removeAllEvents();
        for(const e of this.events) {
          calendarApi.addEvent({
            id: e.id,
            title: e.title,
            start: e.start_time,
            end: e.end_time,
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
  },
}
</script>

<style scoped>
  .calendar {
    margin: 0 100px;
  }
  .calendar-box {
    margin: 20px 0;
  }

  @media only screen and (max-width: 1120px) {
    .calendar {
      margin: 0;
    }
  }

</style>