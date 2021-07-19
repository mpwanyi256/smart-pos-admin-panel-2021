<template>
    <Basemodal
      :title="`Book room ${room.name.toUpperCase()}`"
      :size="1020" @close="$emit('close')">
      <div class="manager_actions">
          <div class="actions_list">
            <div class="frm_entry">
                <div>
                    <label>First name</label>
                    <div>
                        <BaseTextfield
                            v-model="firstname"
                            :preset="firstname"
                            placeholder="First name"
                        />
                        <div
                            v-if="isKnownClient && !knownclientSet"
                            @click="setClientInfo(isKnownClient)"
                            class="known_client">
                            {{isKnownClient.full_name}}
                        </div>
                    </div>
                </div><div>
                    <label>Last name</label>
                    <BaseTextfield
                        v-model="lastname"
                        :preset="lastname"
                        placeholder="Last name"
                    />
                </div>
            </div>
            <div class="frm_entry">
                <div>
                    <label>Address</label>
                    <BaseTextfield
                    v-model="address"
                    :preset="address"
                    placeholder="Address"
                    />
                </div><div>
                    <label>Email address</label>
                    <BaseTextfield
                        v-model="email"
                        :preset="email"
                        placeholder="email"
                    />
                </div>
            </div>
            <div class="frm_entry">
                <div>
                    <label>Contact number</label>
                    <BaseTextfield
                        v-model="contactNumber"
                        :preset="contactNumber"
                        placeholder="+256780101601"
                    />
                </div>
                <div>
                    <label>Booking method</label>
                    <v-select
                        outlined dense
                        :items="methods"
                        v-model="bookingMethod"
                        item-value="id"
                        item-text="method"
                    />
                </div>
            </div>
            <div class="frm_entry">
                <div>
                    <label>Adults</label>
                    <BaseTextfield
                    v-model="adults"
                    inputType="number"
                    placeholder="Number of adults"
                    />
                </div>
                <div>
                    <label>Kids</label>
                    <BaseTextfield
                    v-model="kids"
                    inputType="number"
                    placeholder="number of kids"
                    />
                </div>
            </div>
            <div class="frm_entry">
                <div>
                    <label>Check in</label>
                    <DatePickerBeta
                      message="Check in"
                      @picked="checkInDate = $event"
                      :min="checkin"
                    />
                </div>
                <div>
                    <label>Check out</label>
                    <DatePickerBeta
                        message="Check out"
                        @picked="checkoutDate = $event"
                        :min="checkInDate"
                    />
                </div>
            </div>
            <div class="frm_entry">
                <div>
                    <label>Daily rate {{ `${room.daily_rate_display} ${room.currency}` }}</label>
                    <BaseTextfield
                    v-model="dailyCharge"
                    :preset="dailyCharge"
                    inputType="number"
                    placeholder="Charge per day"
                    />
                </div>
                <div>
                    <label>Client notes</label>
                    <BaseTextfield
                        v-model="remarks"
                        placeholder="Client remarks"
                    />
                </div>
            </div>
            <div class="frm_entry">
                <div>
                    <h2>
                        Total Bill: {{ `${totalCharges} ${room.currency}` }}
                    </h2>
                </div>
                <div>
                    <label>{{ message }}</label>
                <div>
                    <v-btn
                        :disabled="!isValid || disableResubmission"
                        class="float-right"
                        @click="bookRoom"
                    >
                        Save
                    </v-btn>
                </div>
                </div>
            </div>
          </div>
      </div>
    </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import DatePickerBeta from '@/components/generics/DatePickerBeta.vue';
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';

/* eslint-disable prefer-destructuring */
export default {
  name: 'BookRoomModal',
  props: {
    room: {
      type: Object,
      required: true,
    },
    checkin: {
      type: String,
      required: true,
    },
  },
  components: {
    Basemodal,
    BaseTextfield,
    DatePickerBeta,
  },
  data() {
    return {
      loading: false,
      message: '',
      methods: [],
      bookingMethod: '',
      firstname: '',
      lastname: '',
      address: '',
      email: '',
      contactNumber: '',
      checkInDate: '',
      checkoutDate: '',
      adults: '',
      kids: '',
      dailyCharge: '',
      totalBill: 0,
      clientId: '',
      clients: [],
      remarks: '',
      knownclientSet: false,
      disableResubmission: false,
    };
  },
  watch: {
    message() {
      setTimeout(() => {
        this.message = '';
      }, 3000);
    },
    isKnownClient() {
      this.knownclientSet = false;
    },
  },
  computed: {
    ...mapGetters('auth', ['user']),

    userTimezone() {
      return new Date().getTimezoneOffset();
    },

    checkinFormatted() {
      return moment(`${this.checkInDate} 00:00:00 ${this.userTimezone}`).format('ddd MMM DD YYYY HH:MM ZZ');
    },

    checkoutFormatted() {
      return moment(`${this.checkoutDate} 00:00:00 ${this.userTimezone}`).format('ddd MMM DD YYYY HH:MM ZZ');
    },

    daysOfStay() {
      const oneDay = 24 * 60 * 60 * 1000;
      const firstDate = new Date(this.checkInDate);
      const secondDate = new Date(this.checkoutDate);

      const days = Math.round(Math.abs((firstDate - secondDate) / oneDay));
      return days + 1;
    },

    totalCharges() {
      return this.daysOfStay * this.dailyCharge;
    },

    selectedClientByEmail() {
      if (!this.email) return null;
      return this.clients.find((client) => client.email === this.email);
    },

    selectedClientByContactNumber() {
      if (!this.contactNumber) return null;
      return this.clients.find((client) => client.contact === this.contactNumber);
    },

    isKnownClient() {
      return this.selectedClientByEmail ? this.selectedClientByEmail
        : this.selectedClientByContactNumber;
    },

    isValid() { //  adjust this
      return this.firstname && this.lastname
      && (this.email || this.contactNumber)
      && this.bookingMethod && this.adults && this.kids && (parseInt(this.totalCharges, 10) > 0);
    },
  },
  created() {
    this.getBookingMethods();
    this.dailyCharge = this.room.daily_rate;
  },
  methods: {
    ...mapActions('accomodation', ['post']),
    ...mapActions('sales', ['getClients']),

    setClientInfo(client) {
      this.knownclientSet = true;
      this.firstname = client.first_name;
      this.lastname = client.last_name;
      this.address = client.address;
      this.contactNumber = client.contact;
      this.email = client.email;
    },

    async fetchClients() {
      const posClients = await this.getClients('all');
      if (!posClients.error) this.clients = posClients.data;
    },

    getBookingMethods() {
      this.post({
        get_booking_methods: 'all',
      }).then(async (response) => {
        this.methods = response.data;
        await this.fetchClients();
      });
    },

    bookRoom() {
      this.loading = true;
      this.disableResubmission = true;
      this.post({
        room_booking: this.room.id,
        firstname: this.firstname.toUpperCase(),
        lastname: this.lastname.toUpperCase(),
        address: this.address.toUpperCase(),
        email: this.email,
        contact_number: this.contactNumber,
        booking_method: this.bookingMethod,
        adults: parseInt(this.adults, 10),
        kids: parseInt(this.kids, 10),
        check_in: this.checkInDate,
        check_out: this.checkoutDate,
        daily_charge: this.dailyCharge,
        days: this.daysOfStay,
        total_bill: this.totalCharges,
        client_id: this.knownclientSet ? this.isKnownClient.id : 0,
        remarks: this.remarks,
        company_id: this.user.company_id,
        user_id: this.user.id,
        currency_id: this.room.currency_id,
        start: this.checkinFormatted,
        end: this.checkoutFormatted,
      }).then((response) => {
        this.$eventBus.$emit('reload-rooms');
        this.message = response.message;
        this.loading = false;
        setTimeout(() => {
          if (!response.error) this.$emit('close');
        }, 1000);
      }).catch(() => {
        this.disableResubmission = false;
        this.loading = false;
      });
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.manager_actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-height: 400px;
  color: $black;
  padding: 15px;

  .actions_list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 15px;

        .frm_entry {
            display: grid;
            grid-template-columns: 50% 50%;
            gap: 15px;
            padding: 0;
            top: 0;
            bottom: 0;

            >div {
                display: flex;
                flex-direction: column;
                gap: 15px;

                .known_client {
                    color: $white;
                    font-weight: bold;
                    padding: 10px;
                    background-color: $green;
                    cursor: pointer;
                    margin: 10px;
                    border-radius: 5px;
                }
            }
        }

    }

  }

</style>
