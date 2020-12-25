<template>
    <div class="panel-sales">
        <TotalSale class="panel-item" />
        <RunningOrders class="panel-item" @vieworder="viewBill" />
        <CreditorsList class="panel-item" @vieworder="viewBill" />
        <BillModal
            v-if="showBill"
            :order="selectedOrder"
            @close="showBill = false"
        />
    </div>
</template>
<script>
import CreditorsList from '@/components/sales/Creditors.vue';
import RunningOrders from '@/components/sales/RunningOrders.vue';
import TotalSale from '@/components/sales/TotalSale.vue';
import BillModal from '@/components/sales/modals/Bill.vue';

export default {
  name: 'SalesPanel',
  components: {
    CreditorsList,
    RunningOrders,
    TotalSale,
    BillModal,
  },
  props: {
    user: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      showBill: false,
      selectedOrder: null,
    };
  },
  computed: {
    companyInfo() {
      return this.user ? this.user.company_info : null;
    },
  },
  methods: {
    viewBill(order) {
      this.selectedOrder = order;
      this.showBill = true;
    },
  },
};
</script>
<style scoped lang="scss">
@import '../../../styles/constants.scss';
    .panel-sales {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        // gap: 10px;
        font-family: $font-style;
        font-size: 1em;
        line-height: 1.47059;
        overflow: auto!important;

        .panel-item {
            min-height: 33.3%!important;
            max-height: 33.3%!important;
            // height: auto;
            background-color: $white;
            color: $grey;
            box-shadow: $shadow;
            // border-radius: 5px;
            font-family: inherit;
            display: flex;
            flex-direction: column;
            gap: 10px;

            h6 {
                color: $black;
                padding: 5px;
                font-weight: bold;
                font-size: 16px;
                line-height: 1.5!important;
            }

            .days-left {
                color: $red;
            }

            .total-sale {
                font-size: 16px;
                line-height: 1.5;
                padding: 10px;
                font-weight: 300;
                border-bottom: 0.5px solid $light-grey;
                color: $white!important;
                background-color: $dark-grey;
                font-weight: bold;
            }

            .view-sales-btn {
                padding: 10px;
            }
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
