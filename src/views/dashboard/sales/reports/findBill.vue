<template>
    <div class="find_bill">
        <div class="header_nav">
            <h3>Find orders</h3>
            <v-spacer></v-spacer>
            <v-btn text :to="{ name: 'overview' }">
                <v-icon left>mdi-arrow-left</v-icon>
                Home
            </v-btn>
        </div>
        <div class="search_filter">
            <div class="bill_no">
                <v-text-field
                  v-model="billNumber"
                  @keyup.enter="findBill"
                  dense class="frm_input"
                  outlined
                  label="Bill no."
                />
            </div>
            <div class="bill_no">
                <v-select
                    outlined
                    label="Select Client"
                    v-model="selectedClient" dense
                    item-text="full_name"
                    item-value="id"
                    :items="clientList"
                />
            </div>
            <div class="bill_no">
                <DatePickerBeta @picked="setDateFrom" :message="'From'" />
            </div>
            <div class="bill_no">
                <DatePickerBeta @picked="setDateTo" :message="'To'" />
            </div>
            <div class="bill_no">
                <v-btn small @click="findBill">Search</v-btn>
            </div>
        </div>
        <div class="orders_table">
            <LinearLoader v-if="loading" />
            <v-btn
              v-if="orders.length > 0"
              small
              @click="exportToExcel"
              class="mt-2 ml-2 green--text darken-4">
              <v-icon left color="green darken-4">mdi-file-excel</v-icon>
              Export to csv
            </v-btn>
            <BaseTable @view="showOrderItems" @bill="showBill" :orders="orders" />
            <OrderDetailsModal
                v-if="showOrderDetails && selectedOrder"
                :order="selectedOrder"
                @close="showOrderDetails = false"
            />
            <BillModal
                v-if="showBillModal && selectedOrder"
                :order="selectedOrder"
                @close="showBillModal = false"
            />
        </div>
    </div>
</template>
<script>
import DatePickerBeta from '@/components/generics/DatePickerBeta.vue';
import BaseTable from '@/components/generics/BaseTable.vue';
import LinearLoader from '@/components/generics/Loading.vue';
import OrderDetailsModal from '@/components/sales/modals/OrderDetails.vue';
import BillModal from '@/components/sales/modals/Bill.vue';
import ExcelExportMixin from '@/mixins/excelMixin';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'FindBill',
  mixins: [ExcelExportMixin],
  components: {
    DatePickerBeta,
    BaseTable,
    LinearLoader,
    OrderDetailsModal,
    BillModal,
  },
  data() {
    return {
      billNumber: '',
      dateFrom: '',
      dateTo: '',
      clientList: [{ id: 0, full_name: 'Select Client' }],
      selectedClient: 0,
      orders: [],
      selectedOrder: null,
      showOrderDetails: false,
      showBillModal: false,
    };
  },
  computed: {
    ...mapGetters('sales', ['loading']),
  },
  methods: {
    ...mapActions('sales', ['getClients', 'filterOrders']),
    exportToExcel() {
      const dataCleaned = this.orders.map((Order) => (
        {
          bill: Order.bill_no,
          date: Order.date,
          time: Order.time,
          table: Order.table,
          amount: Order.bill_sum,
          discount: Order.discount,
          amount_paid: Order.final_amount,
          settlement: Order.settlement,
          waiter: Order.waiter,
          client: Order.client_name || '',
          description: Order.discount_reason ? Order.discount_reason : Order.description,
        }));
      this.exportDataToExcel(dataCleaned, 'OrdersExport_smart_pos');
    },
    async findBill() {
      if (this.loading) return;
      const filters = {
        from: this.dateFrom,
        to: this.dateTo,
        client_id: this.selectedClient,
        bill_no: this.billNumber,
        company_id: localStorage.getItem('smart_company_id'),
      };
      console.log('Find bill', filters);
      const Orders = await this.filterOrders(filters);
      this.orders = Orders.data.orders;
    },

    showOrderItems(order) {
      this.selectedOrder = order;
      this.showOrderDetails = true;
    },

    showBill(order) {
      this.selectedOrder = order;
      this.showBillModal = true;
    },

    setDateFrom(dateSelected) {
      this.dateFrom = dateSelected;
    },

    setDateTo(dateSelected) {
      this.dateTo = dateSelected;
    },
  },
  async created() {
    const Clients = await this.getClients('all');
    if (Clients.data) this.clientList = [{ id: 0, full_name: 'Select Client' }, ...Clients.data];
  },
};
</script>
<style scoped lang="scss">
@import '../../../../styles/constants.scss';

    .find_bill {
        background-color: $white;
        font-family: $font-style;
        min-height: 100%;
        border-left: 0.5px solid $border-color;

        .header_nav {
            height: 56px;
            width: 100%;
            padding: 5px;
            border-bottom: 0.5px solid $border-color;
            display: inline-flex;
            // justify-content: center;
        }

        .search_filter {
            height: 100px;
            width: 100%;
            padding: 5px;
            border-bottom: 0.5px solid $border-color;
            display: inline-flex;
            flex-direction: row;
            justify-content: center;

            > div {
                height: 100%;
                overflow: hidden;
                padding: 5px;
                width: 100%;
                justify-content: center;
                justify-self: center;
                margin-top: 20px;

                .frm_input {
                    height: 30px;
                }
            }
        }
    }
</style>
