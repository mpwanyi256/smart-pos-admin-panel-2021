<template>
    <div class="table"
        :class="isSelectedTable"
        @click="$emit('order', table)"
    >
        {{ table.name }}<br>
        <small v-if="table.order.order_number">
            #{{ table.order.order_number }}
        </small>
        <v-icon class="printer">mdi-printer</v-icon>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TableComponent',
  props: {
    table: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('pos', ['runningOrder']),

    selectedTable() {
      return this.runningOrder ? this.runningOrder.table_id : 0;
    },

    hasOrder() {
      return this.table.order.id > 0;
    },

    isSelectedTable() {
      // eslint-disable-next-line no-nested-ternary
      return (this.selectedTable === this.table.id) && this.hasOrder ? 'isSelected' : this.hasOrder ? 'hasOrder' : '';
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.table {
    background-color: $white;
    border: 1px solid $border-color;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 70px;
    margin: 1px;
    cursor: pointer;
    font-size: 14px !important;
  }

  .isSelected {
    background-color: $accent-color !important;
    color: $white;
  }

  .hasOrder {
    border: 1px solid $accent-color !important;
    color: $accent-color;
    font-weight: bold;
  }

  .printer {
    color: $black !important;
  }

</style>
