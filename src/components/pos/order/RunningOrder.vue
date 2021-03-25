<template>
    <div class="runnning_order">
        <Alert v-if="false" icon="warning" status="warining" />
        <div class="order_header" v-if="runningOrder">
            <h2>Order {{ order.bill_no }}</h2>
            <div class="date_and_time">
                <p>
                    {{ order.date }}
                    <span>
                        <v-icon small class="clock_icon">mdi-clock</v-icon>
                    </span>
                    {{ order.time }}
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
                    @viewItems="viewPendingItems"
                />
            </div>
        </div>
        <div class="order_sum_info">
            <OrderTotalCacular :order="order" />
            <OrderItemsList
              v-if="showItems && orderItemSelected"
              @close="showItems = false"
              :item="orderItemSelected"
            />
        </div>
    </div>
</template>
<script>
import OrderItem from '@/components/pos/order/OrderItem.vue';
import OrderListHeader from '@/components/pos/order/OrderListHeader.vue';
import OrderTotalCacular from '@/components/pos/order/OrderTotalCacular.vue';
import Alert from '@/components/generics/Alert.vue';
import OrderItemsList from '@/components/pos/order/OrderItemsList.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'RunningOrder',
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  components: {
    Alert,
    OrderItem,
    OrderListHeader,
    OrderTotalCacular,
    OrderItemsList,
  },
  data() {
    return {
      orderItems: [],
      showItems: false,
      orderItemSelected: null,
    };
  },
  computed: {
    ...mapGetters('pos', ['runningOrder', 'runningOrderId', 'orders']),

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

    viewPendingItems(orderItem) {
      this.orderItemSelected = orderItem;
      this.showItems = true;
    },

    async fetchOrderItems() {
      const items = await this.getOrderItems(this.runningOrderId);
      if (!items.error) this.orderItems = items.data.sort((a, b) => a.status - b.status);
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
