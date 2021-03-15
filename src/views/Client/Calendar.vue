<template>

  <div class="calendar">
    <button class="btn btn-primary form-input "> <font-awesome-icon icon="plus"/> Add event </button>

    <div class="calendar-box">
      <full-calendar :options="calendarOptions" />
    </div>
  </div>

</template>

<script>

import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'

export default {
  name: 'Calendar',
  components: {
    FullCalendar
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        firstDay: 1,
        dateClick: this.handleDateClick,
        events: [
          { title: 'Workout 1', start: '2021-04-01 20:00:00', end: '2021-04-05 21:00:00' },
          { title: 'Workout 2', date: '2021-03-02' }
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridDay'
        },
      }
    }
  },
  methods: {
    handleDateClick(arg) {
      let calendarApi = arg.view.calendar;
      calendarApi.changeView('timeGridDay', arg.dateStr);
    }
  }
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