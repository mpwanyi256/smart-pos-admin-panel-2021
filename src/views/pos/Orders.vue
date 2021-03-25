<template>
    <div class="orders">
        <div class="day_open" v-if="dayOpen">
            {{ dayOpen }}
        </div>
        <div class="order_list">
            <div class="order_pane">
                <div
                    v-for="order in orders"
                    :key="order.order_id"
                    :class="order.order_id == runningOrderId ? 'active' : ''"
                    @click="setOrder(order)"
                >
                    <h3>#{{ order.bill_no }}</h3>
                    <small>
                        {{ `${order.waiter} @ ${order.time}` }}
                    </small>
                    <small>Amount: {{ order.bill_sum_display }}</small>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Orders',

  data() {
    return {
      polling: null,
    };
  },

  computed: {
    ...mapGetters('auth', ['user']),
    ...mapGetters('pos', ['runningOrderId', 'orders']),

    dayOpen() {
      return this.user && this.user.company_info ? this.user.company_info.day_open : null;
    },

    dayOpenDisplay() {
      return this.user ? this.user.company_info.day_open_display : '';
    },
  },

  created() {
    const setPolling = async () => {
      if (!this.user) {
        clearInterval(this.polling);
      } else {
        this.fetchOrders();
      }
    };
    this.polling = setInterval(() => {
      setPolling();
    }, 3000);
  },

  eventBusCallbacks: {
    'fetch-orders': 'fetchOrders',
  },

  methods: {
    ...mapActions('pos', ['filterOrders']),
    ...mapActions('pos', ['setRunningOrder', 'setRunningOrderId']),

    async fetchOrders() {
      const orders = await this.filterOrders({
        bill_no: '',
        from: this.dayOpen,
        to: this.dayOpen,
        client_id: '',
      });
      if (!orders.error) this.setRunning(orders.data.orders);
    },

    setRunning(orders) {
      if (!this.runningOrderId) return;
      const findRunning = orders.find((Order) => Order.order_id === this.runningOrderId);
      if (findRunning) this.setRunningOrder(findRunning);
    },

    setOrder(order) {
      this.setRunningOrder(order);
      this.setRunningOrderId(order.order_id);
      localStorage.setItem('smart_running_order', order.order_id);
      this.$eventBus.$emit('fetch-orders');
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/pos.scss';

    .orders {
        width: 100%;
        height: calc(100vh - 52px);
        display: flex;
        flex-direction: column;

        .day_open {
            height: 50px;
            background-color: $white;
            color: $black;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
        }

        .order_list {
            max-height: calc(100vh - 102px);
            overflow-x: hidden;
            overflow-y: auto;

            .order_pane {
                display: flex;
                flex-direction: column;
                gap: 3px;
                padding: 10px;

                >div {
                    height: 58px;
                    width: 100%;
                    overflow: hidden;
                    background-color: $white;
                    color: $black;
                    display: flex;
                    flex-direction: column;
                    justify-content: left;
                    align-items: left;
                    cursor: pointer;
                    padding-left: 5px;
                    box-shadow: $elevation-low;
                    border-radius: 5px;
                }

                >div:focus {
                    font-weight: bold;
                }

                .active {
                  background-color: $blue;
                  color: $white;
                }
            }
        }

    }
</style>
