<template>
    <div class="runnning_order">
        <div class="order_header" v-if="runningOrder">
            <h2>Order {{ runningOrder.bill_no }}</h2>
            <div class="date_and_time">
                <p>
                    {{ runningOrder.date }}
                    <span>
                        <v-icon small class="clock_icon">mdi-clock</v-icon>
                    </span>
                    {{ runningOrder.time }}
                </p>
            </div>
        </div>
        <OrderListHeader />
        <div class="items_list">
            <div class="items">
                <OrderItem
                    v-for="item in orderItems"
                    :key="item.id"
                    :item="item"
                />
            </div>
        </div>
        <div class="order_sum_info">
            <OrderTotalCacular :order="runningOrder" />
        </div>
    </div>
</template>
<script>
import OrderItem from '@/components/pos/order/OrderItem.vue';
import OrderListHeader from '@/components/pos/order/OrderListHeader.vue';
import OrderTotalCacular from '@/components/pos/order/OrderTotalCacular.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'RunningOrder',
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      orderItems: [],
    };
  },
  components: {
    OrderItem,
    OrderListHeader,
    OrderTotalCacular,
  },
  computed: {
    ...mapGetters('pos', ['runningOrder', 'runningOrderId']),

    orderId() {
      return this.runningOrder ? this.runningOrder.order_id : null;
    },
  },

  watch: {
    runningOrderId(val) {
      this.fetchOrderItems(val);
    },
  },

  created() {
    if (this.order) this.fetchOrderItems();
  },

  eventBusCallbacks: {
    'fetch-items': 'fetchOrderItems',
  },

  methods: {
    ...mapActions('sales', ['getOrderItems']),

    async fetchOrderItems(orderId) {
      const items = await this.getOrderItems(orderId || this.order.order_id);
      if (!items.error) this.orderItems = items.data;
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/pos.scss';

    .runnning_order {
        height: 100%;
        width: 100%;
        background-color: $white;
        display: flex;
        flex-direction: column;
        box-shadow: $elevation-default;
        color: $black;

        .order_header {
            height: 56px;
            background-color: $header;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding-left: 15px;
            padding-top: 10px;

            p .clock_icon {
                color: $black;
            }
        }

        .items_list {
            height: calc(100vh - 208px);
            overflow-y: auto;
            box-shadow: $elevation-default;

            .items {
                display: flex;
                flex-direction: column;
            }
        }

        .order_sum_info {
            height: 400px;
            display: flex;
            flex-direction: column;
            background-color: $header;
        }
    }
</style>
