<template>
    <div class="dashboard">
      <div class="calendar_view">
        <Calendar
          ref="calendar"
          :rooms="rooms"
          :property="property"
          @reload="fetchRooms"
          v-if="property"
        />
      </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import Calendar from '@/components/accomodation/manage/Calendar.vue';

export default {
  name: 'Dashboard',
  components: {
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
      selectedRoom: null,
      links: [
        { name: 'Calendar', icon: 'mdi-calendar', path: 'accomodation_dashboard' },
        { name: 'Stats', icon: 'mdi-graph', path: 'accomodation_statistics' },
      ],
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
  },

  methods: {
    ...mapActions('accomodation', ['post']),

    fetchRooms() {
      this.post({
        fetch_rooms: this.property.id,
      }).then((response) => {
        this.rooms = [{ id: 0, name: 'ALL ROOMS' }, ...response.data];
        this.$refs.calendar.triggerFetchBookings();
      }).catch((e) => {
        console.info('error fetching rooms', e);
        this.rooms = [{ id: 0, name: 'ALL ROOMS' }];
      });
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.dashboard {
  height: calc(100vh - 104px);
  width: 100%;
  background-color: $white;
  overflow: hidden;

  >div {
    background-color: $white;
  }
}
</style>
