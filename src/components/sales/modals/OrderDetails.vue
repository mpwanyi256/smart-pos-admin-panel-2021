<template>
    <Basemodal :size="700" :title="modalTitle" @close="$emit('close')">
        <div class="order-details">
            <CompanyInfo v-if="false" />
            <div class="bill_info text-left mb-3" v-if="true">
                <div><div class="item_title">Date:</div> <span>{{ order.date }}</span></div>
                <div><div class="item_title">BILL #:</div> <span>{{ order.bill_no }}</span></div>
                <div><div class="item_title">Served By:</div> <span>{{ order.waiter }}</span></div>
                <div><div class="item_title">Table:</div> <span>{{ order.table }}</span></div>
                <div><div class="item_title">Time:</div> <span>{{ order.time }}</span></div>
                <div v-if="order.client_name">
                    <div class="item_title">Client:</div> <span>{{ order.client_name }}</span>
                </div>
            </div>
            <div class="order-items">
              <OrderItems :total="items.total_amount_display" :items="items ? items.data : []" />
            </div>
        </div>
    </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';
import CompanyInfo from '@/components/generics/CompanyDetails.vue';
import OrderItems from '@/components/generics/OrderItems.vue';
import { mapActions } from 'vuex';

export default {
  name: 'OrderDetailsModal',
  components: {
    Basemodal,
    CompanyInfo,
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
    };
  },
  methods: {
    ...mapActions('sales', ['getOrderItems']),
  },
  async created() {
    const orderItems = await this.getOrderItems(this.order.order_id);
    if (!orderItems.error) {
      this.items = orderItems;
    }
  },
};
</script>
<style scoped lang="scss">
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
</style>
