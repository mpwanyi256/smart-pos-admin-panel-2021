<template>
    <div class="kds">
        <NavBar />
        <div class="toggle_display">
            <div>
                <h1 v-if="dayOpenDisplay">{{ `Display Screen ${dayOpenDisplay}`}}</h1>
            </div>
            <div>
                <div>
                    <v-btn icon small @click="fetchRunningOrders(true)">
                        <v-icon>mdi-refresh</v-icon>
                    </v-btn>
                </div>
                <div>
                    <v-select
                        outlined dense
                        :items="departments"
                        item-text="name"
                        item-value="id"
                        v-model="selectedDepartment"
                    />
                </div>
            </div>
        </div>
        <div class="orders_pane">
            <template v-if="loading">
                <div v-for="column in displayRows" :key="`column-${column.name}`">
                    <div class="column_header" :class="displayColorCode(column.name)">
                        <h1>{{ column.name }}</h1>
                    </div>
                    <LoadingKds />
                </div>
            </template>
            <template v-else>
                <div v-for="column in displayRows" :key="`column-${column.name}`">
                    <div class="column_header" :class="displayColorCode(column.name)">
                        <h1>{{ column.name }}</h1>
                    </div>
                    <div class="kot_list">
                        <template v-for="kot in columnKots(column.name)">
                            <KOTOrder
                                v-if="columnKots(column.name).length > 0"
                                :key="kot.id"
                                :kot="kot"
                                :column="column.name"
                                :columnClass="displayColorCode(column.name)"
                                @reload="fetchRunningOrders"
                            />
                        </template>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import NavBar from '@/components/nav/Navbar.vue';
import KOTOrder from '@/components/kds/KOTOrder.vue';
import LoadingKds from '@/components/kds/LoadingKds.vue';
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';

export default {
  name: 'KDS',
  components: {
    NavBar,
    KOTOrder,
    LoadingKds,
  },
  data() {
    return {
      runningOrders: [],
      selectedDepartment: 0,
      displayRows: [
        { name: 'New orders', min: 0, max: 5 },
        { name: 'Running Late', min: 5, max: 8 },
        { name: 'Delayed', min: 8, max: 1000000 },
        // { name: 'Ready', min: 8, max: 1000000 },
      ],
      loading: true,
      polling: null,
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),
    ...mapGetters('menu', ['departments']),

    routeName() {
      return this.$route.name;
    },

    dayOpen() {
      return this.user && this.user.company_info ? this.user.company_info.day_open
        : moment(new Date()).format('YY-MM-DD');
    },

    dayOpenDisplay() {
      return this.user && this.user.company_info ? this.user.company_info.day_open_display
        : moment(new Date()).format('YY-MM-DD');
    },
  },
  watch: {
    async selectedDepartment() {
      await this.fetchRunningOrders(true);
    },
    routeName(val) {
      if (val !== 'kds') clearInterval(this.polling);
    },
  },
  beforeDestroy() {
    clearInterval(this.polling);
  },
  async created() {
    await this.fetchRunningOrders(true);
    await this.getDepartments(0);
    this.loading = false;
    this.polling = setInterval(async () => {
      await this.fetchRunningOrders();
    }, 5000);
  },
  methods: {
    ...mapActions('kds', ['queryKds']),
    ...mapActions('menu', ['getDepartments']),

    displayColorCode(column) {
      let notColor;
      if (column === 'New orders') {
        notColor = 'just_in';
      } else if (column === 'Running Late') {
        notColor = 'delaying';
      } else if (column === 'Ready') {
        notColor = 'ready';
      } else {
        notColor = 'delayed';
      }

      return notColor;
    },

    columnKots(column) {
      if (!this.runningOrders.length) return [];
      let kots;
      if (column === 'New orders') {
        kots = this.runningOrders.filter((Order) => (Order.delay_time <= 5)
        && this.hasPendingItems(Order.items));
      } else if (column === 'Running Late') {
        kots = this.runningOrders.filter((Order) => (Order.delay_time > 5)
        && (Order.delay_time <= 7) && this.hasPendingItems(Order.items));
      } else if (column === 'Ready') {
        kots = this.runningOrders.filter((Order) => Order.has_ready_orders);
      } else if (column === 'Delayed') {
        kots = this.runningOrders.filter((Order) => (Order.delay_time > 7)
        && this.hasPendingItems(Order.items));
      }
      return kots;
    },

    hasPendingItems(kotItems) {
      let hasPending;
      kotItems.forEach((el) => {
        if (el.status === 0) hasPending = true;
      });
      return hasPending;
    },

    async fetchRunningOrders(showLoader = false) {
      if (!this.dayOpen) return;
      if (showLoader) this.loading = true;
      const KOTs = await this.queryKds({
        get_pending_kots: this.dayOpen,
        department_id: this.selectedDepartment,
      }).catch((e) => {
        console.log('Error fetching kds', e);
        return { data: [] };
      });
      if (!KOTs.error_message.length) this.runningOrders = KOTs.data;
      this.loading = false;
    },
  },
};
</script>
<style scoped lang="scss">
@import '../../styles/constants.scss';

.kds {
    width: 100vw;
    height: 100vh;
    margin: 0;
    background-color: $body-bg;
    display: flex;
    flex-direction: column;
    font-family: $font-style !important;

    ::-webkit-scrollbar{
        width: 5px;
        height: 5px;
    }

    ::-webkit-scrollbar-thumb {
        background: $scrollbar-color;
        border-radius: 1ex;
        -webkit-border-radius: 1ex;
    }

    ::-webkit-scrollbar-corner {
        background: #000;
    }

    .orders_pane {
        overflow-x: hidden;
        overflow-y: auto;
        top: 0;
        bottom: 0;
        height: calc(100vh - 104px);
        display: flex;
        flex-direction: row;

        > div:last-child {
            border: none;
        }

        > div {
            width: 100%;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            border-right: 1px solid $border-color;

            .kot_list {
                display: flex;
                flex-direction: column;
                height: calc(100vh - 156px);
                overflow-x: hidden;
                overflow-y: auto;
                gap: 10px;
                padding-top: 5px;
            }

            .column_header {
                height: 52px !important;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                font-size: large;
                color: $black;
            }

            .just_in {
                background-color: $blue;
                color: $white;
            }

            .delaying {
                background-color: $orange;
                color: $white;
            }

            .delayed {
                background-color: $red;
                color: $white !important;
            }

            .ready {
                background-color: $green !important;
                color: $white !important;
            }
        }
    }

    .toggle_display {
        height: 52px;
        background-color: $white;
        display: grid;
        grid-template-columns: 50% 50%;
        justify-content: left;
        align-items: center;

        > div :first-child {
            padding-left: 10px;
            color: $black;
        }

        > div:last-child {
            direction: rtl;
            padding-right: 10px;
            // display: inline-flex;
            // justify-content: center;

            > div {
                display: inline-flex;
                justify-content: center;
                direction: ltr;
                align-items: center;
                max-width: 350px;
                margin-top: 5px;
                margin-right: 5px;
            }
        }
    }
}
</style>
