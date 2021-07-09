<template>
    <div class="accomodation">
        <StatsHeader :stats="bookingStats" />
        <div class="stats_info">
            <ActiveBookings :bookings="activeBookings" />
            <BookingOptionsOverview :bookings="bookingsOverview" />
        </div>
    </div>
</template>
<script>
import StatsHeader from '@/components/accomodation/stats/StatsHeader.vue';
import ActiveBookings from '@/components/accomodation/stats/ActiveBookings.vue';
import BookingOptionsOverview from '@/components/accomodation/stats/BookingOptionsOverview.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Stats',
  props: {
    property: {
      type: Object,
      required: true,
    },
  },
  components: {
    StatsHeader,
    ActiveBookings,
    BookingOptionsOverview,
  },
  data() {
    return {
      activeBookings: [],
      bookingsOverview: [],
      bookingStats: [],
    };
  },
  computed: {
    propertyId() {
      return this.property ? this.property.id : null;
    },
  },
  watch: {
    propertyId(val) {
      if (val) {
        this.$nextTick(async () => {
          await this.fetchBookingStats();
          await this.fetchActiveBookings();
          await this.fetchBookingMethodsOverview();
        });
      }
    },
  },
  created() {
    this.$nextTick(async () => {
      if (this.propertyId) {
        await this.fetchBookingStats();
        await this.fetchActiveBookings();
        await this.fetchBookingMethodsOverview();
      }
    });
  },
  methods: {
    ...mapActions('accomodation', ['post']),

    async fetchBookingStats() {
      const res = await this.post({ fetch_booking_status: this.propertyId })
        .catch(() => null);
      if (res) this.bookingStats = res.data;
    },

    async fetchBookingMethodsOverview() {
      const res = await this.post({ fetch_bookings_overview: this.propertyId })
        .catch(() => null);
      if (res) this.bookingsOverview = res.data;
    },

    async fetchActiveBookings() {
      const bookings = await this.post({ fetch_active_bookings: this.propertyId })
        .catch(() => null);
      if (bookings) this.activeBookings = bookings.data;
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.accomodation {
  height: calc(100vh - 104px);
  width: 100%;
  background-color: #f7f7f7;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;

  .stats_info {
    height: calc(100vh - 260px);
    width: 100%;
    margin-top: 5px;
    background-color: inherit;
    display: grid;
    grid-template-columns: 70% 30%;
    gap: 10px;
  }
}

</style>
