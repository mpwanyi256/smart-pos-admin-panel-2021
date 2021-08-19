<template>
    <Basemodal
      :title="`Payment for ${booking.name}`"
      :size="700" @close="$emit('close')">
        <div class="payment_view">
            <div>
                <p>{{ `Amount (${booking.currency})` }}</p>
                <p>
                    <BaseTextfield
                        v-model="amountPaid"
                        inputType="number"
                        :placeholder="`Amount in (${booking.currency})`"
                    />
                </p>
            </div>
            <div>
                <p>Date paid</p>
                <p>
                    <DatePickerBeta
                        @picked="paymentDate = $event"
                        message="Payment date"
                    />
                </p>
            </div>
            <div>
                <p>Payment mode</p>
                <p>
                    <v-select
                        outlined dense
                        v-model="paymentMode"
                        :items="paymentsOptions"
                        item-value="id"
                        item-text="name"
                    />
                </p>
            </div>
            <div class="pay">
                <p>&nbsp;</p>
                <p>
                    <v-btn
                    :disabled="isValidPayment || disableCreation"
                    @click="savePayment"
                    class="float-right">
                        Save
                    </v-btn>
                </p>
            </div>
        </div>
    </Basemodal>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import Basemodal from '@/components/generics/Basemodal.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import DatePickerBeta from '@/components/generics/DatePickerBeta.vue';

export default {
  name: 'CreatePayment',
  props: {
    booking: {
      type: Object,
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
      paymentDate: '',
      amountPaid: '',
      paymentMode: 1,
      acceptablePaymentModes: [1, 11, 12, 10, 2],
      disableCreation: false,
    };
  },
  computed: {
    ...mapState('pos', ['paymentSettlements']),
    ...mapGetters('auth', ['user']),

    isValidPayment() {
      return !parseInt(this.amountPaid, 10) > 0;
    },

    paymentsOptions() {
      return this.paymentSettlements.filter((payment) => this.acceptablePaymentModes
        .includes(payment.id));
    },
  },
  async created() {
    await this.fetchsetpaymentSettlements();
  },
  methods: {
    ...mapActions('pos', ['fetchsetpaymentSettlements']),
    ...mapActions('accomodation', ['post']),

    savePayment() {
      this.disableCreation = true;
      const payment = {
        add_payment: this.booking.booking_id,
        payment_date: this.paymentDate,
        amount_paid: parseInt(this.amountPaid, 10),
        payment_mode: this.paymentMode,
        added_by: this.user.id,
      };
      this.post(payment).then((response) => {
        if (response.error) this.message = response.message;
        else this.$emit('reloadPayments');
      });
      this.disableCreation = false;
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.payment_view {
    height: 300px;
    overflow: hidden;
    display: grid;
    grid-template-columns: 50% 50%;
    padding: 15px;

    >div {
        display: flex;
        flex-direction: column;
        top: 0;
        bottom: 0;
        margin: 5px;

        .pay {
            display: flex;
            justify-content: center;
            align-items: center;
        }

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
