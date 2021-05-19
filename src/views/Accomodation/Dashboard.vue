<template>
    <div class="dashboard">
      <PropertyUnits
        :property="property"
        :rooms="rooms"
        @reload="fetchRooms"
        @viewBookings="loadRoomBookings"
      />
      <div class="calendar_view">
        <Calendar
          ref="calendar"
          :bookings="calendarBookings"
          @refresh="refreshCalendar"
        />
      </div>
    </div>
</template>
<script>
import PropertyUnits from '@/components/accomodation/dashboard/PropertyUnits.vue';
import Calendar from '@/components/accomodation/manage/Calendar.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Dashboard',
  components: {
    PropertyUnits,
    Calendar,
  },
  props: {
    property: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      rooms: [],
      calendarBookings: [],
      selectedRoom: null,
    };
  },
  computed: {
    propertyId() {
      return this.property.id;
    },
    freeRooms() {
      return this.rooms.filter((room) => !room.booked);
    },
    bookings() {
      return this.rooms.filter((room) => room.booked);
    },
  },
  watch: {
    propertyId(val) {
      if (val) this.fetchRooms();
    },
  },
  created() {
    if (this.property) this.fetchRooms();
  },
  eventBusCallbacks: {
    'reload-rooms': 'fetchRooms',
    'reload-bookings': 'refreshCalendar',
  },

  methods: {
    ...mapActions('accomodation', ['post']),

    fetchRooms() {
      this.post({
        fetch_rooms: this.property.id,
      }).then((response) => {
        this.rooms = response.data;
        this.$eventBus.$emit('load-calendar');
      });
    },

    refreshCalendar(dateSet, roomId) {
      this.post({
        fetch_bookings: this.property.id,
        room_id: roomId || 'all',
        date_from: dateSet.start,
        date_to: dateSet.end,
      }).then((response) => {
        this.calendarBookings = response.data;
      });
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.dashboard {
    display: flex;
    height: calc(100vh - 104px);
    width: 100vw;
    background-color: $bg_color;
    display: grid;
    grid-template-columns: 25% 75%;
    overflow: hidden;

    >div {
      background-color: $white;
    }
}
</style>
