<template>
    <div class="orders">
        <h2 class="ma-2">Orders</h2>
        <Table>
            <template slot="header">
                <tr>
                    <th>#</th>
                    <th>Time</th>
                    <th>Amount</th>
                    <th>Discount</th>
                    <th>Final amount</th>
                    <th>Settlement</th>
                    <th>Served By</th>
                    <th>Client</th>
                </tr>
            </template>
            <template slot="body">
                <tr v-for="order in orders" :key="order.bill_no">
                    <td>{{ order.bill_no }}</td>
                    <td>{{ order.time }}</td>
                    <td>{{ order.bill_sum_display }}</td>
                    <td>{{ order.discount }}</td>
                    <td>{{ order.final_amount }}</td>
                    <td>{{ order.settlement_name }}</td>
                    <td>{{ order.waiter }}</td>
                    <td>{{ order.client_name }}</td>
                </tr>
            </template>
        </Table>
    </div>
</template>
<script>
import Table from '@/components/generics/new/Table.vue';

export default {
  name: 'OrdersList',
  components: {
    Table,
  },
  props: {
    orders: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>
<style scoped>
.orders {
    min-height: 150px;
    display: flex;
    flex-direction: column;
}
</style>
