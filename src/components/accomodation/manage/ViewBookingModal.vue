<template>
    <Basemodal
      :title="`${booking.name.toUpperCase()}`"
      :size="1020" @close="$emit('close')">
        <template slot="action">
            <div class="actions">
                <template v-if="booking.confirmed == 0">
                <BaseTooltip
                    @button="confirmBooking(9)"
                    message="Cancel booking"
                    icon="thumb-down"
                    color="red"
                />
                <BaseTooltip
                    @button="confirmBooking(1)"
                    message="confirm booking"
                    icon="thumb-up"
                    color="green"
                />
                </template>
                <template v-else>
                    <p :style="`color: ${booking.color}; font-weight: bold;`">
                        {{ booking.confirmed == 1 ? 'Confirmed' : 'Cancelled' }}
                    </p>
                </template>
                <!-- <v-btn text class="green" dark>
                    <v-icon left>mdi-thumb-up</v-icon>
                    Confirm booking
                </v-btn> -->
            </div>
        </template>
        <div class="booking">
            <div v-if="bookingInfo">
                <h2>Booking details</h2>
                <div>
                    <p>Room name</p>
                    <p>
                        <strong>{{ bookingInfo.room_name }}
                        </strong>
                    </p>
                </div>
                <div>
                    <p>Client name</p>
                    <p>{{ bookingInfo.client_fullname }}</p>
                </div>
                <div>
                    <p>Email address</p>
                    <p>{{ bookingInfo.client_email || 'Not provided' }}</p>
                </div>
                <div>
                    <p>Contact number</p>
                    <p>{{ bookingInfo.contact_number || 'Not provided' }}</p>
                </div>
                <div>
                    <p>Checkin</p>
                    <p>{{ bookingInfo.check_in_display }}</p>
                </div>
                <div>
                    <p>Checkout</p>
                    <p>{{ bookingInfo.check_out_display }}</p>
                </div>
                <div>
                    <p>Number of adults</p>
                    <p>{{ bookingInfo.adults_count }}</p>
                </div>
                <div>
                    <p>Number of kids</p>
                    <p>{{ bookingInfo.kids_count }}</p>
                </div>
                <div>
                    <p>Booking method</p>
                    <p>{{ bookingInfo.booking_method }}</p>
                </div>
            </div>
            <div v-if="bookingInfo">
                <h2>Payment details</h2>
                <div>
                    <p>Daily cahrge</p>
                    <p>{{ `${bookingInfo.daily_charge} ${booking.currency}` }}</p>
                </div>
                <div>
                    <p>Days of stay</p>
                    <p>{{ `${daysOfStay} days` }}</p>
                </div>
                <div>
                    <p>Total bill</p>
                    <p>{{ `${bookingInfo.total_bill} ${booking.currency}` }}</p>
                </div>
            </div>
        </div>
    </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';
import BaseTooltip from '@/components/generics/BaseTooltip.vue';
import { mapActions } from 'vuex';

export default {
  name: 'ViewBookingModal',
  components: {
    Basemodal,
    BaseTooltip,
  },
  props: {
    booking: {
      type: Object,
      required: true,
    },
  },
  computed: {
    bookingInfo() {
      return this.booking;
    },
    daysOfStay() {
      const oneDay = 24 * 60 * 60 * 1000;
      const firstDate = new Date(this.bookingInfo.check_in);
      const secondDate = new Date(this.bookingInfo.check_out);

      const days = Math.round(Math.abs((firstDate - secondDate) / oneDay));
      return days === 0 ? 1 : days;
    },
  },
  methods: {
    ...mapActions('accomodation', ['post']),

    confirmBooking(status) {
      this.post({
        confirm_booking: this.booking.booking_id,
        status,
      }).then(() => {
        this.$eventBus.$emit('load-calendar');
        this.$emit('close');
      });
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.actions {
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-right: 10px;
}

.booking {
    min-height: 200px;
    overflow: hidden;
    display: grid;
    grid-template-columns: 50% 50%;
    padding: 15px;

    >div {
        display: flex;
        flex-direction: column;
        gap: 5px;

        >div {
            display: grid;
            grid-template-columns: 50% 50%;

            p {
                top: 0;
                bottom: 0;
                margin: 0;
                color: $black;
                font-size: 16px;
                font-weight: 400;
                span {
                    font-weight: bold;
                }
            }

            p:first-child {
                color: $gray-20;
            }
            p:last-child {
                // text-transform: capitalize;
                color: $gray-20;
                font-weight: 300;
            }
        }
    }
}

</style>
