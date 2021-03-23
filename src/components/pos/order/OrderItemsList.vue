<template>
    <Basemodal
        :title="`${itemsLength} ${item.item_name}`"
        :size="700" @close="$emit('close')">
        <div class="menu_items">
            <OrderItemPreview
                v-for="item in orderItemsList"
                :key="item.id"
                :orderItem="item"
                @delete="deleteItem"
                @note="addItemNote"
            />
        </div>
    </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';
import OrderItemPreview from '@/components/pos/order/OrderItemPreview.vue';
import { mapActions } from 'vuex';

export default {
  name: 'OrderItemsList',
  components: {
    Basemodal,
    OrderItemPreview,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      orderItemsList: [],
    };
  },
  computed: {
    itemsLength() {
      return this.orderItemsList.length;
    },
  },

  created() {
    this.fetchOrderItems();
  },

  eventBusCallbacks: {
    'fetch-items': 'fetchOrderItems',
  },

  methods: {
    ...mapActions('sales', ['getOrderItems']),
    ...mapActions('pos', ['updateRunningOrder']),

    async addItemNote(note) {
      await this.updateRunningOrder(note);
      this.$eventBus.$emit('fetch-items');
    },

    async deleteItem(orderItemId) {
      const filter = {
        delete_order_item: orderItemId,
      };
      await this.updateRunningOrder(filter);
      this.$eventBus.$emit('fetch-items');
      if (this.itemsLength === 0) this.$emit('close');
    },

    async fetchOrderItems() {
      const items = await this.getOrderItems(this.item.order_id);
      if (!items.error) {
        const Items = items.data.find((Item) => Item.id === this.item.id);
        if (!Items) {
          this.$emit('close');
          return;
        }
        const OrderItems = Items.items_list.sort((a, b) => a.status - b.status);
        if (Items) this.orderItemsList = OrderItems;
      }
    },
  },
};
</script>
<style scoped lang="scss">
    .menu_items {
        height: 300px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 10px;
        overflow-y: auto;
    }
</style>
