<template>
    <div class="sales-div">
      <template>
        <div class="section-title ma-2">
            <h3>Settlements</h3>
        </div>
        <div class="sales-overview">
            <div class="settled-orders"
              v-for="payment in settlements"
              :key="payment.settlement_id"
            >
                <div class="display">
                    <h1>{{ payment.amount }}</h1>
                    <span>{{ payment.settlement_name }}</span>
                </div>
            </div>
        </div>
        <div class="section-title ma-2">
            <h3>Departmentwise sales</h3>
        </div>
        <div class="sales-overview">
            <div class="settled-orders" v-for="(payment, i) in departmentSales" :key="i">
                <div class="display">
                    <h1>{{ payment.amount }}</h1>
                    <span>{{ payment.name }}</span>
                    <i class="red--text darken-3" v-if="payment.name == 'OPEN DISH'">
                      <small>Is included in BAR & Kitchen</small>
                    </i>
                </div>
            </div>
        </div>

        <div class="all-orders">
            <Orders @view="viewOrderDetails" @bill="viewBill" />
            <OrderDetailsModal
              ref="orderdetails"
              v-if="showOrderDetails && selectedOrder"
              :order="selectedOrder"
              @cancel="cancelOrderItem"
              @close="showOrderDetails = false"
            />
            <CancelOrderItemModal
              v-if="showCancelItemModal && itemToCancel"
              :orderItem="itemToCancel"
              @cancelItem="cancelItemOnOrder"
              @close="showCancelItemModal = false"
            />
            <BillModal
                v-if="showBill"
                :order="selectedOrder"
                @close="showBill = false"
            />
        </div>
        <div class="running_orders">
          <RunningOrders class="panel-item" @vieworder="viewBill" />
          <CreditorsList class="panel-item" @vieworder="viewBill" />
        </div>
        <BillModal
            v-if="showBill"
            :order="selectedOrder"
            @close="showBill = false"
        />
      </template>
    </div>
</template>
<script>
import Orders from '@/components/sales/allOrders.vue';
import OrderDetailsModal from '@/components/sales/modals/OrderDetails.vue';
import BillModal from '@/components/sales/modals/Bill.vue';
import CancelOrderItemModal from '@/components/sales/modals/cancelItem.vue';
import CreditorsList from '@/components/sales/Creditors.vue';
import RunningOrders from '@/components/sales/RunningOrders.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Settlements',
  components: {
    Orders,
    OrderDetailsModal,
    BillModal,
    CancelOrderItemModal,
    CreditorsList,
    RunningOrders,
  },
  data() {
    return {
      showOrderDetails: false,
      showBill: false,
      showCancelItemModal: false,
      selectedOrder: null,
      itemToCancel: null,
      loading: true,
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),
    ...mapGetters('sales', ['sale']),
    company() {
      return this.user ? this.user.company_info : null;
    },
    settlements() {
      return this.sale.settlements ? this.sale.settlements : [];
    },
    departmentSales() {
      return this.sale.departments_settlement ? this.sale.departments_settlement : [];
    },
  },
  methods: {
    ...mapActions('sales', ['CancelOrderItem']),

    async cancelItemOnOrder(data) {
      await this.CancelOrderItem(data);
      this.showCancelItemModal = false;
      this.$refs.orderdetails.fetchOrderItems();
    },

    cancelOrderItem(item) {
      this.itemToCancel = item;
      this.showCancelItemModal = true;
    },

    viewOrderDetails(order) {
      this.showOrderDetails = true;
      this.selectedOrder = order;
    },
    viewBill(order) {
      this.selectedOrder = order;
      this.showBill = true;
    },
  },
};
</script>
<style scoped lang="scss">
@import '../../styles/constants.scss';

.sales-div {
    display: grid;
    flex-direction: column;
    gap: 5px;
    width: inherit;
    height: inherit;
    // overflow-y: auto;

    .running_orders {
      max-height: 200px;
      display: grid;
      grid-template-columns: 50% 50%;
      gap: 10px;
      padding: 10px 0 10px 0;
    }

    .sales-overview {
        max-width: 100%;
        height: auto;
        display: inline-flex;
        flex-direction: row;
        gap: 1px;
        overflow-y: auto;
        margin: 5px;

        .settled-orders, .running-orders {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            color: black;
            border-right: 0.5px solid #e2e2e2;
            background-color: white;
            // font-family: $font-style;
            padding: 10px;
            cursor: pointer;

            h1 {
                font-size: 16px !important;
                font-weight: bold;
            }

            .display {
                display: flex;
                flex-direction: column;
                text-align: center;
                cursor: pointer;
            }
        }
    }

    .sales-sammary {
        height: 250px;
        width: 100%;
        display: grid;
        grid-template-columns: 100% 100%;
        margin: 5px;

        >div {
            background-color: white;
        }

        >div:first-child {
            margin-right: 2px;
        }

        >div:last-child {
            margin-left: 2px;
        }

        .sales-outline {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            overflow-y: hidden;
            overflow-x: auto;

            .sale {
                display: grid;
                grid-template-columns: 50% 25% 25%;
                text-align: left;
                width: 100%;
                height: 36px;
                border: 0.3px solid #d6d6d6;
                justify-content: center;
            }
        }
    }

    .all-orders {
        width: inherit;
        background-color: white;
        min-height: 200px;
        max-height: 100%;
        overflow-y: auto;
        margin: 5px;
        overflow: hidden;
    }

    .pending {
        min-height: 150px;
        border: 1px solid $light-grey;
        padding-top: 5px;

        .header {
            background-color: $dark-grey;
            padding: 10px;
            color: $white;
            text-align: left;
            font-weight: bold;
        }
    }

}
</style>
