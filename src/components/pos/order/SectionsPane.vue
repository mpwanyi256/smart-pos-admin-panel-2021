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
              <span v-if="section.has_orders">
                {{ ordersCount(section) }}
              </span>
              {{ section.name }}
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="tables_display">
              <TableComponent
                v-for="table in section.tables"
                :key="table.id"
                :table="table"
                @order="confirmOrderCreation(table)"
                :ref="`table-${table.id}`"
              />
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <ConfirmModal
        v-if="dialog && tableSelected"
        :title="`Create new order for ${tableSelected.name}`"
        @close="cancelCreate"
        @yes="createOrder"
      />
    </div>
</template>
<script>
import TableComponent from '@/components/pos/order/TableComponent.vue';
import ConfirmModal from '@/components/generics/ConfirmModal.vue';
import TimezoneMixin from '@/mixins/TimezoneMixin';
import { mapActions } from 'vuex';

export default {
  name: 'SectionsPane',

  mixins: [
    TimezoneMixin,
  ],

  components: {
    TableComponent,
    ConfirmModal,
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

  data() {
    return {
      tableSelected: null,
      dialog: false,
    };
  },

  methods: {
    ...mapActions('pos', ['setRunningOrderId', 'setRunningOrder']),

    cancelCreate() {
      this.tableSelected = null;
      this.dialog = false;
    },

    ordersCount(section) {
      return section.tables.filter((Table) => Table.order.id !== null).length;
    },

    setOrder(orderId) {
      this.$eventBus.$emit('fetch-orders');
      this.setRunningOrderId(orderId);
    },

    confirmOrderCreation(table) {
      if (table.order.id) {
        this.setOrder(table.order.id);
        return;
      }
      this.tableSelected = table;
      this.dialog = true;
    },

    async createOrder() {
      if (!this.user) return;
      const filters = {
        table_id: this.tableSelected.id,
      };
      this.$eventBus.$emit('create-table-order', filters);
      this.dialog = false;
      this.tableSelected = null;
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
  font-size: 14px;
}

.has-orders {
  background-color: $border-color !important;
  font-weight: bold;
  font-size: 12px;
  border-bottom: 1px solid $border-color;

  span {
    color: $accent-color;
    margin-right: 5px;
    font-size: 14px;
  }
}

.tables_display {
  max-height: 210px;
  overflow-y: auto;
  overflow-x: hidden;
  display: grid;
  grid-template-columns: 50% 50%;
}

</style>
