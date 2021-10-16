<template>
    <div class="active_bookings">
        <Table>
            <template slot="header">
                <th>#</th>
                <th>Name</th>
                <th>Check in</th>
                <th>Check out</th>
                <th>Room</th>
            </template>
            <template slot="body">
                <tr v-for="(booking, i) in bookings"
                    :key="`booking-${booking.booking_id}`"
                    @click="viewBooking(booking)"
                >
                    <td>{{ i+1 }}</td>
                    <td>{{ booking.client_fullname }}</td>
                    <td>{{ booking.check_in_display }}</td>
                    <td>{{ booking.client_checkout }}</td>
                    <td>{{ booking.room_name }}</td>
                </tr>
            </template>
        </Table>
    <ViewBookingModal
      v-if="showBooking && selectedBooking"
      @close="showBooking = false"
      :booking="selectedBooking"
    />
    </div>
</template>
<script>
import Table from '@/components/generics/new/Table.vue';
import ViewBookingModal from '@/components/accomodation/manage/ViewBookingModal.vue';

export default {
  name: 'ActiveBookings',
  props: {
    bookings: {
      type: Array,
      required: true,
    },
  },
  components: {
    Table,
    ViewBookingModal,
  },
  data() {
    return {
      showBooking: false,
      selectedBooking: null,
    };
  },
  methods: {
    viewBooking(booking) {
      this.selectedBooking = booking;
      this.showBooking = true;
      console.log(booking);
    },
  },
};
</script>
<style scoped lang="scss">

    .active_bookings {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        background-color: white;

        Table tr {
            cursor: pointer;
        }
    }
</style>
