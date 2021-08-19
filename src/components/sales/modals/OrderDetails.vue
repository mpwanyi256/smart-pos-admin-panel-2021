<template>
    <Basemodal :size="700" :title="modalTitle" @close="$emit('close')">
        <div class="order-details">
            <div class="bill_info text-left mb-3">
                <div><div class="item_title">Date</div> <span>{{ order.date }}</span></div>
                <div><div class="item_title">BILL</div> <span>{{ order.bill_no }}</span></div>
                <div><div class="item_title">Served By</div> <span>{{ order.waiter }}</span></div>
                <div><div class="item_title">Table</div> <span>{{ order.table }}</span></div>
                <div><div class="item_title">Time</div> <span>{{ order.time }}</span></div>
                <div v-if="order.client_name">
                    <div class="item_title">Client</div> <span>{{ order.client_name }}</span>
                </div>
                <div><div class="item_title">Total Bill</div>
                  <span><strong color="red">{{ order.bill_sum_display }}</strong></span>
                </div>
            </div>
            <div class="discount_section" v-if="order.discount > 0">
              <div class="discount_amount">
                Discount: {{ order.discount }}
              </div>
              <div class="discount_reason">
                {{ order.discount_reason }}
              </div>
            </div>
            <div class="settlement-options" v-if="false">
              <v-btn small>Settle Order</v-btn>
              <v-btn small>Cancel Order</v-btn>
              <v-btn small>Discount Order</v-btn>
            </div>
            <div class="order-items">
              <OrderItems @cancel="cancelOrderItem" :items="items ? items : []" />
            </div>
        </div>
    </Basemodal>
</template>
<script>
import { mapActions } from 'vuex';
import Basemodal from '@/components/generics/Basemodal.vue';
import OrderItems from '@/components/generics/OrderItems.vue';

export default {
  name: 'OrderDetailsModal',
  components: {
    Basemodal,
    OrderItems,
  },
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      modalTitle: 'Order details',
      items: [],
      loading: true,
    };
  },
  methods: {
    ...mapActions('sales', ['getOrderItems']),

    cancelOrderItem(item) {
      this.$emit('cancel', { ...item, order_id: this.order.order_id, order_date: this.order.date });
    },
    async fetchOrderItems() {
      const orderItems = await this.getOrderItems(this.order.order_id);
      if (!orderItems.error) {
        this.items = orderItems.data;
      }
      this.loading = false;
    },
  },
  mounted() {
    this.fetchOrderItems();
  },
};
</script>
<style scoped lang="scss">
@import '../../../styles/constants.scss';

    .settlement-options {
      display: flex;
      flex-direction: row;
      gap: 10px;
      margin: 16px;
    }
    .bill_info {
        display: flex;
        flex-direction: column;
        gap: 1px;
        padding-left: 10px;
        line-height: 1.5;
        font-size: 14px;

        .item_title {
          font-size: 14px;
          font-weight: bold;
        }

        > div {
            display: grid;
            grid-template-columns: 20% 80%;
        }

        .title {
            font-weight: bold;
        }
    }
    .order-items {
        max-height: 300px;
        min-height: 100px;
        overflow-y: hidden;
        overflow-x: hidden;
        border: 0.5px solid #b6b6b6;
        display: flex;
        flex-direction: column;
    }

    .discount_section {
      padding: 5px;
      display: inline-flex;
      flex-direction: row;
      width: auto;
      gap: 10px;
      border: 0.5px solid $dark-grey;
      margin: 5px;
      border-radius: 16px;
      justify-items: center;
      font-size: 14px;

      .discount_amount {
        font-weight: bold;
      }

      .discount_reason {
        font-weight: 200;
        background-color: $red;
        color: $white;
        border-radius: 16px;
        border: 0.5px solid $red;
        padding-left: 5px;
        padding-right: 5px;
      }
    }
</style>
