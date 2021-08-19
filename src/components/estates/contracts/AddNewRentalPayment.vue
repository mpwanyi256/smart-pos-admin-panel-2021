<template>
    <Basemodal
      :title="`Payment for ${contract.full_name}`"
      :size="700" @close="$emit('close')">
        <div class="payment_view">
            <div>
                <p>{{ `Amount (${contract.currency_name})` }}
                    <span>
                        Agreed rent {{ contract.monthly_rent_agreed }}
                    </span>
                </p>
                <p>
                    <BaseTextfield
                        v-model="amountPaid"
                        inputType="number"
                        :placeholder="`Amount in (${contract.currency_name})`"
                    />
                </p>
            </div>
            <div>
                <p>Date paid</p>
                <p>
                    <DatePickerBeta
                        @picked="paymentDate = $event"
                        :min="contract.payment_cycle_start"
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
            <div>
                <p>Remarks</p>
                <p>
                    <BaseTextfield placeholder="remarks" v-model="remarks" />
                </p>
            </div>
            <div class="error_message">&nbsp;
                {{ errorMessage }}
            </div>
            <div>
                <v-btn
                :disabled="isValidPayment || disableCreation"
                @click="savePayment"
                class="float-right">
                    Save
                </v-btn>
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
  name: 'AddNewRentalPayment',
  props: {
    contract: {
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
      remarks: '',
      paymentMode: 1,
      acceptablePaymentModes: [1, 11, 12, 10, 2],
      disableCreation: false,
      errorMessage: '',
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
  watch: {
    errorMessage(val) {
      if (val) {
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      }
    },
  },
  async created() {
    await this.fetchsetpaymentSettlements();
  },
  methods: {
    ...mapActions('pos', ['fetchsetpaymentSettlements']),
    ...mapActions('estates', ['post']),

    savePayment() {
      this.disableCreation = true;
      const payment = {
        add_payment: this.contract.current_payment_cycle_id,
        payment_date: this.paymentDate,
        amount_paid: parseInt(this.amountPaid, 10),
        payment_mode: this.paymentMode,
        added_by: this.user.id,
        remarks: this.remarks.toUpperCase(),
      };
      this.post(payment).then(async (response) => {
        if (response.error) this.errorMessage = response.message;
        else {
          this.$eventBus.$emit('refetch-rental-payments');
          this.$emit('close');
        }
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

    .error_message {
        color: $red;
        text-align: center;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        text-transform: uppercase;
    }

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
