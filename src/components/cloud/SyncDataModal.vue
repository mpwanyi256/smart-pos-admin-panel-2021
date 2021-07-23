<template>
    <Basemodal
      title="Cloud backups"
      :size="600" @close="$emit('close')">
        <div class="data_sync">
            <h3>Select duration</h3>
            <div class="duration_period">
                <DatePickerBeta
                    message="From"
                    @picked="dateFrom = $event"
                />
                <DatePickerBeta
                    message="To"
                    @picked="dateTo = $event"
                    :min="dateTo"
                />
            </div>
            <div class="duration_period mt-3">
                <div class="error_alert">
                    {{ orders[0] }}
                </div>
                <div class="error_alert">
                    <v-btn @click="getOrders" small class="float-right">
                        <v-icon left>mdi-cloud</v-icon>
                        Sync data
                    </v-btn>
                </div>
            </div>
        </div>
    </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';
import DatePickerBeta from '@/components/generics/DatePickerBeta.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'SyncDataModal',
  components: {
    Basemodal,
    DatePickerBeta,
  },
  data() {
    return {
      orders: [],
      dateFrom: '',
      dateTo: '',
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),

    company() {
      return this.user.company_info;
    },
  },
  methods: {
    ...mapActions('backups', ['fetchData', 'pushToCloud']),

    async getOrders() {
      const DATA = await this.fetchData({
        get_orders: 'all',
        date_from: this.dateFrom,
        date_to: this.dateTo,
      }).catch(() => null);

      if (DATA) {
        this.orders = DATA.data;
        const PAYLOAD = {};
        PAYLOAD.collection = 'Orders';
        PAYLOAD.data = [];
        this.orders.forEach((order) => {
          PAYLOAD.data.push({
            key: `${order.company_id}${this.company.company_tin}${order.order_id}${order.bill_no}${this.user.outlet_id}`,
            data: { ...order, company_ref: this.company.company_email },
          });
        });
        await this.pushToCloud(PAYLOAD);
        // console.log('Cloud payload', PAYLOAD);
      }
    },

  },
};
</script>
<style scoped lang="scss">
.data_sync {
    display: flex;
    flex-direction: column;
    gap: 15px;
    min-height: 200px;
    padding: 16px;

    .duration_period {
        display: grid;
        grid-template-columns: 49% 49%;
        gap: 15px;
    }
}
</style>
