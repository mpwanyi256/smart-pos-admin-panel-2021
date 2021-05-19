<template>
    <div class="orders">
        <div
          class="day_open"
          v-show="dayOpen"
          @click="actions = true"
        >
         <p>
           <span class="time_display">
             <v-btn text class="time_display">
              <v-icon class="time_display" left>
                mdi-calendar
              </v-icon>
              {{ dayOpenDisplay }} -
              {{ timeNow }}
             </v-btn>
           </span>
         </p>
        </div>
        <div class="order_list">
            <SectionsPane
              v-if="companyType == 1"
              :sections="activeTables"
              :user="user"
              :dayOpen="dayOpen"
            />
            <div v-else
              class="order_pane">
                <div
                  v-for="order in pendingOrders"
                  :key="order.order_id"
                  :class="order.order_id == runningOrderId ? 'active' : ''"
                  @click="setOrder(order)"
                  :ref="`order-${order.order_id}`"
                >
                    <h3>#{{ order.bill_no }}</h3>
                    <small>
                        {{ `${order.waiter} @ ${order.time}` }}
                    </small>
                    <small>Amount: {{ order.bill_sum_display }}</small>
                </div>
            </div>
        </div>
        <ManagerActions
          v-if="actions"
          @close="actions = false"
          @action="actionHandler"
        />
        <SalesReport
          v-if="viewSales"
          @close="viewSales = false"
          :date="dayOpen"
        />
        <SwitchDayModal
          v-if="switchDay"
          @switch="closeDay"
          :message="errorMessage"
          :loading="loading"
        />
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import SectionsPane from '@/components/pos/order/SectionsPane.vue';
import ManagerActions from '@/components/pos/manage/ManagerActions.vue';
import SalesReport from '@/components/Reports/SalesReport.vue';
import SwitchDayModal from '@/components/pos/manage/SwitchDayModal.vue';
import TimezoneMixin from '@/mixins/TimezoneMixin';

export default {
  name: 'Orders',
  mixins: [TimezoneMixin],
  components: {
    SectionsPane,
    ManagerActions,
    SalesReport,
    SwitchDayModal,
  },

  data() {
    return {
      polling: null,
      sections: [],
      actions: false,
      viewSales: false,
      timeNow: '',
      switchDay: false,
      errorMessage: '',
      loading: false,
    };
  },

  computed: {
    ...mapGetters('auth', ['user']),
    ...mapGetters('pos', ['runningOrderId', 'orders']),

    userRole() {
      return this.user ? this.user.role : 0;
    },

    activeTables() {
      return this.sections.filter((Section) => !Section.hidden);
    },

    companyType() {
      return this.user ? this.user.company_info.business_type : 0;
    },

    pendingOrders() {
      return this.orders.filter((Order) => Order.status === 0);
    },

    dayOpen() {
      return this.user && this.user.company_info ? this.user.company_info.day_open : null;
    },

    dayOpenDisplay() {
      return this.user ? this.user.company_info.day_open_display : '';
    },
  },

  async created() {
    await this.fetchOrders();
    await this.fetchTables();

    setInterval(() => {
      const timeKati = new Date().getTime();
      const extract = new Date(timeKati);
      this.timeNow = `${extract.getHours()}:${extract.getMinutes()}:${extract.getSeconds()}`;
    }, 1000);
  },

  eventBusCallbacks: {
    'fetch-orders': 'fetchOrders',
    'reload-order': 'reload',
  },

  methods: {
    ...mapActions('pos', ['filterOrders', 'setRunningOrder', 'setRunningOrderId', 'updateOrder']),
    ...mapActions('auth', ['getUserById']),
    ...mapActions('reports', ['getReport']),

    getTimeNow(unixTimestamp) {
      const date = new Date(unixTimestamp * 1000);
      // Hours part from the timestamp
      const hours = date.getHours();
      // Minutes part from the timestamp
      const minutes = `0${date.getMinutes()}`;
      // Seconds part from the timestamp
      const seconds = `0${date.getSeconds()}`;

      // Will display time in 10:30:23 format
      return `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
    },

    actionHandler(action) {
      switch (action) {
        case 'sales':
          if ([3, 5].includes(this.userRole)) this.viewSales = true;
          break;
        case 'open':
          this.switchDay = true;
          break;
        default:
          console.log('Invalid action');
          this.actions = true;
          return;
      }
      this.actions = false;
    },

    async closeDay(datePicked) {
      this.loading = true;
      this.getReport({
        close_day: this.dayOpen,
        open_day: datePicked,
      }).then((response) => {
        this.errorMessage = response.message;
        setTimeout(() => {
          this.switchDay = false;
          this.errorMessage = '';
          this.getUserById();
          this.loading = false;
        }, 5000);
      });
    },

    async fetchTables() {
      const Sections = await this.updateOrder(
        {
          get_setup_sections: this.user.company_id,
          day_open: this.dayOpen,
        },
      );
      if (!Sections.error) this.sections = Sections.data;
    },

    async reload() {
      await this.fetchOrders();
      this.$eventBus.$emit('fetch-items');
    },

    async fetchOrders() {
      await this.fetchTables();
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
      this.$eventBus.$emit('fetch-orders');
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

    .orders {
        width: 100%;
        height: calc(100vh - 52px);
        display: flex;
        flex-direction: column;

        .time_display {
          color: $accent-color;
        }

        .day_open {
          height: 50px;
          background-color: $white;
          color: $accent-color;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
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
