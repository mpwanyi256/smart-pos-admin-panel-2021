<template>
    <div class="selected_order">
      <RunningOrder
          class="running_order"
          :order="running"
      />
    </div>
</template>
<script>
import RunningOrder from '@/components/pos/order/RunningOrder.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'SelectedOrder',
  components: {
    RunningOrder,
  },

  computed: {
    ...mapGetters('pos', ['runningOrder', 'runningOrderId', 'orders']),

    orderId() {
      return this.runningOrder ? this.runningOrder.order_id : null;
    },

    running() {
      return this.orderId ? this.orders.find((Order) => Order.order_id === this.orderId) : null;
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/pos.scss';

    .selected_order {
        height: calc(100% - 52px);
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: top;
        align-items: center;
        padding-left: 5px;
        padding-right: 5px;

        .running_order {
            width: 100%;
            height: 100%;
        }
    }

</style>
