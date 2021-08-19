<template>
    <Basemodal
      :title="``"
      :size="900" @close="$emit('close')"
    >
    <div class="contract_details">
        <div class="property_details">
            <div class="tenant">
                <Avatar src="" class="x-large" />
                <div class="property_info">
                    <h3>{{ contract.full_name }}</h3>
                    <p><v-icon>mdi-home-variant-outline</v-icon>
                       <span>{{ contract.property_name }}</span>&nbsp;&nbsp;|
                       {{ contract.unit_name }}
                    </p>
                    <div>
                    <v-btn text small class="float-left">
                        <v-icon left>mdi-eye</v-icon>
                        View all payment plans
                    </v-btn>
                </div>
                </div>
            </div>
            <div class="payment_details">
                <h3>{{ `${contract.monthly_rent_agreed} ${contract.currency_name}
                    ${contract.payment_mode}` }}</h3>
                <p>Current payment plan</p>
                <div>
                    <v-btn small class="float-right" @click="$emit('add-payment')">
                        <v-icon left>mdi-plus</v-icon>
                        Create payment
                    </v-btn>
                </div>
            </div>
        </div>
        <h3 class="most_recent_payment_header">Most recent payments</h3>
        <div class="most_recent_payments">
            <div>
                <Table>
                    <template slot="header">
                        <tr>
                            <th>#</th>
                            <th>Date paid</th>
                            <th>Amount</th>
                            <th>Payment method</th>
                            <th>Added by</th>
                            <th>&nbsp;</th>
                        </tr>
                    </template>
                    <template slot="body">
                        <tr v-for="(payment, count) in payments"
                            :key="`payment${payment.payment_id}`"
                        >
                            <td>{{ ++count }}</td>
                            <td>{{ payment.payment_date }}</td>
                            <td>{{ payment.amount_display }}</td>
                            <td>{{ payment.payment_mode }}</td>
                            <td>{{ payment.added_by }}</td>
                            <td>
                                <v-btn icon small>
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </template>
                </Table>
            </div>
        </div>
    </div>
    </Basemodal>
</template>
<script>
import { mapActions } from 'vuex';
import Basemodal from '@/components/generics/Basemodal.vue';
import Avatar from '@/components/generics/new/Avatar.vue';
import Table from '@/components/generics/new/Table.vue';

export default {
  name: 'ViewContractInformationModal',
  props: {
    contract: {
      type: Object,
      required: true,
    },
  },
  components: {
    Basemodal,
    Avatar,
    Table,
  },
  data() {
    return {
      paymentPlans: [],
      payments: [],
    };
  },
  async mounted() {
    await this.fetchPaymentPlans();
  },
  eventBusCallbacks: {
    'refetch-rental-payments': 'fetchContractPayments',
  },
  async created() {
    await this.fetchContractPayments();
  },
  methods: {
    ...mapActions('estates', ['post']),

    async fetchContractPayments() {
      const PAYMENTS = await this.post(
        { fetch_payment_structure_payments: this.contract.contract_id, limit: 10 },
      );
      if (!PAYMENTS.error) this.payments = PAYMENTS.data;
    },

    async fetchPaymentPlans() {
      const PLANS = await this.post({ get_payment_plans: this.contract.contract_id });
      this.paymentPlans = PLANS.data;
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.contract_details {
    min-height: 300px;
    display: flex;
    flex-direction: column;

    .property_details {
        display: grid;
        grid-template-columns: 50% 50%;
        border-bottom: 0.3px solid $border-color;
        padding-bottom: 16px;

        .tenant {
            display: flex;
            flex-direction: row;
            gap: 15px;
            justify-content: left;
            align-items: top;
            padding-left: 16px;

            .property_info {
                display: flex;
                flex-direction: column;

                p {
                    color: $dark-grey;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    line-height: 1.5;
                    top: 0;
                    bottom: 0;
                    span {
                        font-weight: bold;
                    }
                }
            }
        }

        .payment_details {
            display: flex;
            flex-direction: column;
            justify-content: right;
            padding-right: 16px;
            h3, p {
                width: 100%;
                text-align: right;
            }

            p {
                color: $dark-grey;
            }
        }
    }

    .most_recent_payment_header {
        color: $grey;
        font-weight: 300;
        margin: 16px;
    }

    .most_recent_payments {
        height: 300px;
        overflow-y: auto;
        overflow-x: hidden;
        display: flex;
        border-top: 0.3px solid $border-color;

        >div {
            width: 100%;
        }
    }
}

</style>
