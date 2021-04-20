<template>
    <div class="sections">
      <v-expansion-panels>
        <v-expansion-panel
          v-for="(section,i) in sections"
          :key="i"
        >
          <v-expansion-panel-header
            :class="section.has_orders ? 'has-orders' : ''">
            <div>
              <v-btn x-small fab
                v-if="section.has_orders"
              class="white">
                {{ ordersCount(section) }}
              </v-btn>
              {{ section.name }}
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="tables_display">
            <TableComponent
              v-for="table in section.tables"
              :key="table.id"
              :table="table"
              @order="createOrder(table)"
            />
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
</template>
<script>
import TableComponent from '@/components/pos/order/TableComponent.vue';
import TimezoneMixin from '@/mixins/TimezoneMixin';
import { mapActions } from 'vuex';

export default {
  name: 'SectionsPane',

  mixins: [
    TimezoneMixin,
  ],

  components: {
    TableComponent,
  },

  props: {
    sections: {
      type: Array,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
    dayOpen: {
      type: String,
      required: true,
    },
  },
  methods: {
    ...mapActions('pos', ['createNewOrder', 'setRunningOrderId', 'filterOrders']),

    ordersCount(section) {
      return section.tables.filter((Table) => Table.order.id !== null).length;
    },

    setOrder(orderId) {
      this.setRunningOrderId(orderId);
      this.$eventBus.$emit('fetch-orders');
    },

    async createOrder(table) {
      console.log('create', table);
      if (table.order.id) {
        this.setOrder(table.order.id);
        return;
      }
      if (!this.user) return;
      const filters = {
        company_id: this.user.company_id,
        user_id: this.user.id,
        date: this.dayOpen,
        time: this.time,
        table_id: table.id,
      };
      const order = await this.createNewOrder(filters);
      await this.$eventBus.$emit('fetch-orders');
      if (!order.error) {
        this.setRunningOrderId(order.order_id);
        const orders = await this.filterOrders({
          bill_no: order.order_id,
          from: '',
          to: '',
          client_id: '',
        });

        const OrderFetched = orders.data.orders;
        if (!OrderFetched.length) return;
        this.setRunningOrder(OrderFetched[0]);
        this.$eventBus.$emit('reload-order');
      } else console.info(order.message);
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.sections {
  display: flex;
  margin: 5px;
  color: $black;
}

.has-orders {
  background-color: $blue !important;
  color: $white !important;
}

.tables_display {
  max-height: 210px;
  overflow-y: auto;
  overflow-x: hidden;
  display: grid;
  grid-template-columns: 50% 50%;
}

</style>
