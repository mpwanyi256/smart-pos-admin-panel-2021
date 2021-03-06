<template>
    <div class="runnning_order">
      <PageAlert v-if="errorMessage" :message="errorMessage" @close="errorMessage= ''" />
        <div class="order_header" v-if="order">
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
import OrderItemsList from '@/components/pos/order/OrderItemsList.vue';
import PageAlert from '@/components/alerts/PageAlert.vue';
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
    OrderItem,
    OrderListHeader,
    OrderTotalCacular,
    OrderItemsList,
    PageAlert,
  },
  data() {
    return {
      orderItems: [],
      showItems: false,
      orderItemSelected: null,
      errorMessage: '',
    };
  },
  computed: {
    ...mapGetters('pos', ['runningOrder', 'runningOrderId', 'orders']),

    orderId() {
      return this.runningOrder ? this.runningOrder.order_id : null;
    },

    isPending() {
      return this.orderItems.filter((Order) => Order.status === 0).length > 0;
    },
  },

  watch: {
    orderId(val) {
      this.$eventBus.$emit('reload-order', val);
      this.fetchOrderItems();
    },

    errorMessage(val) {
      if (!val) return;
      setTimeout(() => {
        this.errorMessage = '';
      }, 5000);
    },
  },

  created() {
    if (this.order) this.fetchOrderItems();
  },

  eventBusCallbacks: {
    'fetch-items': 'fetchOrderItems',
    'print-bill': 'checkOrderStatus',
    'trigger-error': 'showErrorAlert',
    'settle-bill': 'settleBill',
  },

  methods: {
    ...mapActions('sales', ['getOrderItems']),

    showErrorAlert(msg) {
      this.errorMessage = msg;
    },

    settleBill() {
      if (!this.isPending) this.$eventBus.$emit('open-settlement-modal');
      else this.$eventBus.$emit('trigger-error', 'Please confirm order.');
    },

    checkOrderStatus() {
      if (!this.isPending) this.$eventBus.$emit('view-bill');
      else this.$eventBus.$emit('trigger-error', 'Please confirm order.');
    },

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
