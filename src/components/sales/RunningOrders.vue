<template>
    <div class="creditors">
        <div class="header">
            <h3>{{ ordersCount }}</h3>
            <div>
                <v-text-field dark outlined dense v-model="search" label="Search for a bill" />
            </div>
        </div>
        <div class="creditors-list">
            <Table>
                <template slot="header">
                    <tr>
                        <th>Bill #</th>
                        <th>Time</th>
                        <th>Section</th>
                        <th>Served by</th>
                        <th>Amount</th>
                        <th>Discount</th>
                        <th>Bill</th>
                        <th>Client</th>
                        <th>&nbsp;</th>
                    </tr>
                </template>
                <template slot="body">
                    <tr
                        v-for="order in filteredOrders"
                        :key="`dash-order-${order.order_id}`"
                    >
                        <td>{{ order.bill_no }}</td>
                        <td>{{ order.time }}</td>
                        <td>{{ order.table }}</td>
                        <td>{{ order.waiter ? order.waiter : '' }}</td>
                        <td>{{ order.bill_sum_display }}</td>
                        <td>{{ order.discount }}</td>
                        <td>{{ order.final_amount }}</td>
                        <td>{{ order.client_name }}</td>
                        <td>
                            <v-btn fab small @click="$emit('vieworder', order)">
                                <v-icon>mdi-information-outline</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </Table>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Table from '@/components/generics/new/Table.vue';

export default {
  name: 'RunningOrders',
  components: {
    Table,
  },
  data() {
    return {
      search: '',
    };
  },
  computed: {
    ...mapGetters('sales', ['orders']),

    ordersCount() {
      return this.orders ? `${this.orders.length} ordes` : 'No orders';
    },

    filteredOrders() {
      return this.orders.filter((order) => order.bill_no.match(this.search));
    },
  },
};
</script>
<style scoped lang="scss">
@import '../../styles/constants.scss';

    .creditors {
        height: 100%;
        background-color: $white;
        font-family: $font-style;
        font-size: 14px;
        line-height: 1.47059;
        display: flex;
        flex-direction: column;
        gap: 0;
        color: inherit;
        overflow-y: auto;

        .header {
            font-weight: 500;
            padding: 10px 16px;
            background-color: $dark-grey;
            color: $white;
            text-align: left;
            font-weight: bold;
            display: grid;
            grid-template-columns: 50% 50%;
            justify-content: center;
        }

        .creditors-list {
            height: 100%;
            width: 100%;
            overflow-y: auto!important;
            overflow-x: hidden;
            display: flex;
            flex-direction: column;

            .creditor-item:first-child, .creditor-item:first-child:hover {
                cursor: default;
                background-color: $light-grey;
                font-weight: bold;
            }

                .creditor-item {
                    max-height: 36px;
                    min-height: 36px;
                    font-size: 1em;
                    line-height: 1.5;
                    color: $black;
                    display: grid;
                    grid-template-columns: 50% 20% 30%;
                    overflow: hidden;
                    border: 0.5px solid $light-grey;

                    .name, .amount {
                        justify-items: center;
                    }
                    .amount {
                        text-align: right;
                        padding-right: 5px;
                    }
                }

                .creditor-item:hover {
                    background-color: $light-grey;
                    font-weight: 700;
                    cursor: pointer;
                }
        }

    }
</style>
