<template>
    <v-data-table
        :headers="headers ? headers : defaultHeader"
        :items="orders"
        :items-per-page="6"
        class="elevation-0"
    >
        <!-- <template v-slot:item.action="{ item }">
            <v-btn small @click="$emit('view', item)">View</v-btn>
        </template> -->
        <template v-if="showDefault" v-slot:item.bill="{ item }">
            <v-btn class="ml-1" small @click="$emit('bill', item)">Bill</v-btn>
        </template>
    </v-data-table>
</template>
<script>
export default {
  name: 'BaseTable',
  props: {
    headers: {
      type: Array,
    },
    orders: {
      type: Array,
      rquired: true,
      default: () => [],
    },
    showDefault: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      defaultHeader: [
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
          text: 'Served by', value: 'waiter', sortable: false, align: 'start',
        },
        {
          text: 'Amount', value: 'bill_sum_display', sortable: false, align: 'start',
        },
        {
          text: 'Discount', value: 'discount', sortable: false, align: 'start',
        },
        {
          text: 'SETTLED', value: 'final_amount', sortable: false, align: 'start',
        },
        {
          text: 'PAY MODE', value: 'settlement', sortable: false, align: 'start',
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
};
</script>
