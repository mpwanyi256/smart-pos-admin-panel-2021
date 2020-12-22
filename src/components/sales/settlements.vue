<template>
    <div class="sales-div">
        <div class="section-title ma-2">
            <h3>Settlements</h3>
        </div>
        <div class="sales-overview">
            <div class="settled-orders" v-for="(payment, i) in settlements" :key="i">
                <div class="display">
                    <h1>{{ payment.amount }}</h1>
                    <span>{{ payment.name }}</span>
                </div>
            </div>
        </div>
        <div class="section-title ma-2">
            <h3>Departmentwise sales</h3>
        </div>
        <div class="sales-overview">
            <div class="settled-orders" v-for="(payment, i) in departments" :key="i">
                <div class="display">
                    <h1>{{ payment.amount }}</h1>
                    <span>{{ payment.name }}</span>
                </div>
            </div>
        </div>

        <div class="all-orders">
            <Orders @view="viewOrderDetails" />
            <OrderDetailsModal
            v-if="showOrderDetails"
            :order="selectedOrder && selectedOrder"
            @close="showOrderDetails = false" />
        </div>
    </div>
</template>
<script>
import Orders from '@/components/sales/allOrders.vue';
import OrderDetailsModal from '@/components/sales/modals/OrderDetails.vue';

export default {
  name: 'Settlements',
  components: {
    Orders,
    OrderDetailsModal,
    // SalesGraph,
  },
  data() {
    return {
      showOrderDetails: false,
      selectedOrder: null,
      settlements: [
        { name: 'CASH', amount: 50000 },
        { name: 'VISA', amount: 3000 },
        { name: 'Mob Mo.', amount: 7000 },
        { name: 'Company', amount: 0 },
        { name: 'Cancelled', amount: 7000 },
        { name: 'NC', amount: 0 },
      ],
      departments: [
        { name: 'BAR', amount: 50000 },
        { name: 'KITCHEN', amount: 3000 },
        { name: 'OPEN D', amount: 7000 },
        { name: 'ACCOM.', amount: 0 },
      ],
    };
  },
  methods: {
    viewOrderDetails(order) {
      this.showOrderDetails = true;
      this.selectedOrder = order;
    //   console.log('Order', order);
    },
  },
};
</script>
<style scoped lang="scss">

.sales-div {
    display: grid;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    height: 100%;
    overflow: auto;

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
        margin: 5px;
        overflow: hidden;
    }

}
</style>
