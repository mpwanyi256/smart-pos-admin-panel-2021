<template>
    <div class="orders">
        <v-card>
            <v-card-title>Orders
                <v-spacer></v-spacer>
                <v-text-field v-model.trim="searchOrder" placeholder="Search bill number" />
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="ordersFiltered"
                :items-per-page="5"
                class="elevation-0"
            >
                <template v-slot:item.action="{ item }">
                    <v-btn small @click="$emit('view', item)">View</v-btn>
                </template>
                <template v-slot:item.bill="{ item }">
                    <v-btn class="ml-1" small @click="$emit('bill', item)">Bill</v-btn>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Orders',
  data() {
    return {
      searchOrder: '',
      headers: [
        {
          text: 'Bill', value: 'bill_no', sortable: false, align: 'start',
        },
        {
          text: 'Date', value: 'date', sortable: false, align: 'start',
        },
        {
          text: 'Time', value: 'time', sortable: false, align: 'start',
        },
        {
          text: 'Table', value: 'table', sortable: false, align: 'start',
        },
        {
          text: 'waiter', value: 'waiter', sortable: false, align: 'start',
        },
        {
          text: 'Amount', value: 'bill_sum_display', sortable: false, align: 'start',
        },
        {
          text: 'Discount', value: 'discount', sortable: false, align: 'start',
        },
        {
          text: 'Client', value: 'client_name', sortable: false, align: 'start',
        },
        {
          text: '', value: 'action', sortable: false, align: 'start',
        },
        {
          text: '', value: 'bill', sortable: false, align: 'start',
        },
      ],
    };
  },
  computed: {
    ...mapGetters('sales', ['orders']),
    ordersFiltered() {
      return this.orders.filter((Order) => Order.bill_no.match(this.searchOrder));
    },
  },
};
</script>
<style scoped lang="scss">
@import '../../styles/constants.scss';
    .orders {
        width: 100%;
        min-height: 100%;
        font-family: $font-style;
    }
</style>
