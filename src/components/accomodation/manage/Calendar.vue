<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar
          flat
        >
          <!-- <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            Today
          </v-btn> -->
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu
            bottom
            right
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet class="calendar_view">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="eventsClean"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        />
      </v-sheet>
    </v-col>

    <ViewBookingModal
        v-if="viewBooking"
        @close="viewBooking = false"
        :booking="selectedEvent"
    />
  </v-row>
</template>
<script>
/* eslint-disable no-plusplus */
import ViewBookingModal from '@/components/accomodation/manage/ViewBookingModal.vue';

export default {
  name: 'Calendar',
  props: {
    bookings: {
      type: Array,
      required: true,
    },
  },
  components: {
    ViewBookingModal,
  },
  data() {
    return {
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      selectedElement: null,
      selectedOpen: false,
      selectedEventId: 0,
      viewBooking: false,
      calendarStartDate: '',
      calendarEndDate: '',
    };
  },
  computed: {
    selectedEvent() {
      return this.bookings.find((event) => event.booking_id === this.selectedEventId.booking_id);
    },
    eventsClean() {
      return this.bookings.map((event) => ({
        color: event.color,
        end: new Date(event.check_out).toISOString().substring(0, 10),
        start: new Date(event.check_in).toISOString().substring(0, 10),
        name: event.name,
        timed: event.timed,
        booking_id: event.booking_id,
      }));
    },

  },
  watch: {
    calendarEndDate() {
      this.triggerFetchBookings();
    },
  },
  eventBusCallbacks: {
    'load-calendar': 'triggerFetchBookings',
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    triggerFetchBookings() {
      this.$eventBus.$emit('reload-bookings', { start: this.calendarStartDate, end: this.calendarEndDate });
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = 'day';
      console.log('View Date', date);
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = '';
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ event }) {
    //   this.selectedEventId = event.booking_id;
      console.log('View event', event);
      this.selectedEventId = event;
      //   this.selectedElement = nativeEvent.target;
      this.viewBooking = true;
    },
    updateRange({ start, end }) {
      this.calendarStartDate = start.date;
      this.calendarEndDate = end.date;
      this.$emit('refresh', { start, end });
      console.log('Update', start.date, end.date);
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>
<style scoped>
.calendar_view {
    height: 100%;
    overflow-y: auto;
}
</style>
