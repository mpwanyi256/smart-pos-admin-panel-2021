<template>
    <Basemodal
      :title="`${booking.name.toUpperCase()}`"
      :size="1020" @close="$emit('close')">
        <template slot="action">
            <div class="actions">
                <template v-if="booking.confirmed == 0">
                <BaseTooltip
                    @button="cancelBooking = true"
                    message="Cancel booking"
                    icon="thumb-down"
                    color="red"
                />
                <BaseTooltip
                    @button="confirmBookingModal = true"
                    message="confirm booking"
                    icon="thumb-up"
                    color="green"
                />
                </template>
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
                <div>
                    <p>Status</p>
                    <p :style="`color: ${booking.color}; font-weight: bold;`">
                        {{ booking.confirmed == 1 ? 'Confirmed' :
                            booking.confirmed == 3 ? 'Checked-out' :
                            booking.confirmed == 0 ? 'Pending' : 'Cancelled' }}
                    </p>
                </div>
                <template v-if="booking.confirmed == 1">
                <div class="mt-6">
                    <div>
                        <v-btn text @click="addPayment = true">
                            <v-icon left>mdi-credit-card</v-icon>
                            Create payment
                        </v-btn>
                    </div>
                </div>
                <div>
                    <div>
                        <v-btn text
                            :disabled="!canCheckout"
                            @click="checkoutClient = true"
                        >
                            <v-icon left>mdi-account-check</v-icon>
                            Checkout
                        </v-btn>
                    </div>
                </div>
                <div>
                    <div>
                        <v-btn
                            :loading="sendingEmail"
                            text
                            @click="sendClientBookingConfirmation(
                            {
                                ...booking, days_of_stay: daysOfStay,
                                company_name: companyInfo.company_name,
                                company_email: companyInfo.company_email,
                                company_location: companyInfo.company_location
                            }
                            )">
                            <v-icon left>mdi-email</v-icon>
                            Re-send Confirmation Email
                        </v-btn>
                    </div>
                </div>
                </template>
            </div>
        </div>
        <div class="booking_payments" v-if="booking.confirmed == 1">
            <Table>
              <template slot="header">
                <tr>
                  <th>#</th>
                  <th>Payment Date</th>
                  <th>Amount</th>
                  <th>Payment mode</th>
                  <th>Delete</th>
                </tr>
              </template>
              <template slot="body">
                <tr
                  v-for="(pay, i) in payments"
                  :key="pay.id">
                  <td>{{ ++i }}</td>
                  <td>{{ pay.payment_date }}</td>
                  <td>{{ pay.amount_paid_display }}</td>
                  <td>{{ pay.payment_mode }}</td>
                  <td>
                      <v-btn icon @click="dropPayment(pay.id)">
                          <v-icon>mdi-delete</v-icon>
                      </v-btn>
                  </td>
                </tr>
              </template>
            </Table>
        </div>
        <CreatePayment
            v-if="addPayment"
            :booking="booking"
            @close="addPayment = false"
            @reloadPayments="refreshPayments"
        />
        <ConfirmModal
            v-if="checkoutClient"
            title="Are you sure you want to checkout client?"
            @close="checkoutClient = false"
            @yes="checkoutHandler"
        />

        <ConfirmModal
            v-if="cancelBooking"
            title="Are you sure you want to cancel booking?"
            @close="cancelBooking = false"
            @yes="confirmBooking(9)"
        />

        <ConfirmModal
            v-if="confirmBookingModal"
            title="Are you sure you want to confirm booking?"
            @close="confirmBookingModal = false"
            @yes="confirmBooking(1)"
        />

        <ConfirmModal
            v-if="confirmPaymentDelete && bookingToDelete"
            title="Are you sure you want to delete payment?"
            @close="cancelBooking = false"
            @yes="DeleteBookingPayment"
        />
    </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';
import BaseTooltip from '@/components/generics/BaseTooltip.vue';
import Table from '@/components/generics/new/Table.vue';
import CreatePayment from '@/components/accomodation/manage/CreatePayment.vue';
import ConfirmModal from '@/components/generics/ConfirmModal.vue';
import { mapActions, mapGetters } from 'vuex';
import EmailMixin from '@/mixins/EmailMixin';
import moment from 'moment';

export default {
  name: 'ViewBookingModal',
  mixins: [EmailMixin],
  components: {
    Basemodal,
    BaseTooltip,
    Table,
    CreatePayment,
    ConfirmModal,
  },
  props: {
    booking: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      addPayment: false,
      payments: [],
      checkoutClient: false,
      cancelBooking: false,
      confirmBookingModal: false,
      bookingToDelete: null,
      confirmPaymentDelete: false,
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),

    dateToday() {
      return moment().format('Y-MM-D');
    },

    daysToCheckout() {
      const oneDay = 24 * 60 * 60 * 1000;
      const firstDate = new Date(this.booking.check_out);
      const secondDate = new Date(this.dateToday);

      const days = Math.round((firstDate - secondDate) / oneDay);
      return days + 1;
    },

    canCheckout() {
      return (this.totalPaid < this.booking.total_bill_amount) && this.daysToCheckout <= 0;
    },

    totalPaid() {
      return this.payments.length
        ? this.payments.map((i) => i.amount_paid).reduce((a, b) => a + b) : 0;
    },

    companyInfo() {
      return this.user.company_info;
    },

    bookingCharge() {
      return this.booking.booking_cost;
    },

    bookingInfo() {
      return this.booking;
    },

    daysOfStay() {
      const oneDay = 24 * 60 * 60 * 1000;
      const firstDate = new Date(this.bookingInfo.check_in);
      const secondDate = new Date(this.bookingInfo.check_out);

      const days = Math.round(Math.abs((firstDate - secondDate) / oneDay));
      return days + 1;
    },
  },
  created() {
    this.$nextTick(() => {
      this.refreshPayments();
    });
  },
  methods: {
    ...mapActions('accomodation', ['post']),

    dropPayment(paymentId) {
      this.bookingToDelete = paymentId;
      this.confirmPaymentDelete = true;
    },

    DeleteBookingPayment() {
      this.post({
        delete_booking_payment_by_id: this.bookingToDelete,
      }).then(async () => {
        await this.refreshPayments();
        this.confirmPaymentDelete = false;
        this.bookingToDelete = null;
      }).catch(() => {
        this.confirmPaymentDelete = false;
        this.bookingToDelete = null;
      });
    },

    checkoutHandler() {
      this.post({
        confirm_booking: this.booking.booking_id,
        status: 3,
      }).then(async () => {
        await this.$eventBus.$emit('load-calendar');
        this.checkoutClient = false;
      });
    },

    confirmBooking(status) {
      this.post({
        confirm_booking: this.booking.booking_id,
        status,
      }).then(async () => {
        this.$eventBus.$emit('load-calendar');
        if (status === 1) {
          await this.sendClientBookingConfirmation(
            {
              ...this.booking,
              days_of_stay: this.daysOfStay,
              company_name: this.companyInfo.company_name,
              company_email: this.companyInfo.company_email,
              company_location: this.companyInfo.company_location,
            },
          );
        }
        if (status === 9) this.$emit('close');
        this.cancelBooking = false;
        this.confirmBookingModal = false;
      });
    },

    refreshPayments() {
      this.post({
        fetch_booking_payments: this.booking.booking_id,
      }).then((response) => {
        this.addPayment = false;
        this.payments = response.data;
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
    // background-color: $gray-95;

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

.booking_payments {
    height: 200px;
    border: 0.5px solid $border-color;
    overflow-y: auto;
    overflow-x: hidden;
}

.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

</style>
