<template>
    <div class="menu_categories">
      <Categories
        :categories="filteredCategories"
        @filterMenu="filterMenuByCategory"
        @search="categorySearchKey = $event"
      />
      <MenuItems
        :items="filteredMenuItems"
        @searchMenu="searchForAMenuItem"
        @create-order="createOrder"
        @addItem="addItemToOrder"
      />
    </div>
</template>
<script>
import Categories from '@/components/pos/menu/Categories.vue';
import MenuItems from '@/components/pos/menu/MenuItems.vue';
import TimezoneMixin from '@/mixins/TimezoneMixin';
import {
  mapActions, mapGetters, mapState,
} from 'vuex';

export default {
  name: 'MenuSection',
  components: {
    Categories,
    MenuItems,
  },
  mixins: [
    TimezoneMixin,
  ],
  data() {
    return {
      categorySearchKey: '',
      quantity: 1,
    };
  },
  computed: {
    ...mapGetters('pos', ['menuItems', 'categories', 'runningOrderId', 'orders']),
    ...mapGetters('auth', ['user']),
    ...mapState('pos', ['selectedTableId']),

    filteredMenuItems() {
      return this.menuItems.filter((Item) => Item.status === 0);
    },

    dayOpen() {
      return this.user ? this.user.company_info.day_open : null;
    },

    filteredCategories() {
      return this.categories.filter((Cat) => Cat.name.toLowerCase()
        .match(this.categorySearchKey.toLowerCase())
        && Cat.status === '0');
    },
  },

  eventBusCallbacks: {
    'create-table-order': 'createTableOrder',
  },

  methods: {
    ...mapActions('pos', ['getMenuItems', 'getMenuCategories', 'setRunningOrder',
      'createNewOrder', 'addOrderItem', 'setRunningOrderId', 'filterOrders',
      'setWorkingTable']),

    async createTableOrder(payload) {
      // if (!this.selectedTableId || this.selectedTableId.table_id !== payload.table_id) {
      //   this.setWorkingTable(payload);
      //   return;
      // }
      const order = await this.createNewOrder({
        ...payload,
        company_id: this.user.company_id,
        user_id: this.user.id,
        date: this.dayOpen,
        time: this.time,
      });
      await this.$eventBus.$emit('fetch-orders');
      if (!order.error) {
        this.setRunningOrderId(order.order_id);
        const orders = await this.filterOrders({
          bill_no: order.order_id,
          from: '',
          to: '',
          client_id: '',
        });

        const OrderFetched = orders.data.orders;
        if (!OrderFetched.length) return;
        this.setRunningOrder(OrderFetched[0]);
        this.$eventBus.$emit('reload-order');
      } else console.info(order.message);
    },

    async addItemToOrder(menuItem) {
      if (!this.runningOrderId) return;
      const filters = {
        order_id: this.runningOrderId,
        menu_item_id: menuItem.id,
        item_unit_price: menuItem.price,
        menu_item_price: (menuItem.price * this.quantity),
        quantity: this.quantity,
        notes: '',
        status: 0,
        added_by: this.user.id,
        add_order_item: this.runningOrderId,
        time: this.time,
      };
      const addItem = await this.addOrderItem(filters);
      if (addItem.error) console.info(addItem.message);
      else {
        this.$eventBus.$emit('reload-order');
      }
    },

    async createOrder() {
      if (!this.user) return;
      const filters = {
        company_id: this.user.company_id,
        user_id: this.user.id,
        date: this.dayOpen,
        time: this.time,
        table_id: 'default',
      };
      const order = await this.createNewOrder(filters);
      await this.$eventBus.$emit('fetch-orders');
      if (!order.error) {
        this.setRunningOrderId(order.order_id);
        const orders = await this.filterOrders({
          bill_no: order.order_id,
          from: '',
          to: '',
          client_id: '',
        });

        const OrderFetched = orders.data.orders;
        if (!OrderFetched.length) return;
        this.setRunningOrder(OrderFetched[0]);
        this.$eventBus.$emit('reload-order');
      } else console.info(order.message);
    },

    searchForAMenuItem(searchKey) {
      setTimeout(() => {
        this.getMenuItems({ category_id: 'all', item_name: searchKey.trim() });
      }, 100);
    },

    filterMenuByCategory(categoryId) {
      this.getMenuItems({ category_id: categoryId, item_name: 'all' });
    },
  },
  created() {
    this.getMenuItems({ category_id: 'all', item_name: 'all' });
    this.getMenuCategories();
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/pos.scss';

    .menu_categories {
        width: 100%;
        height: calc(100% - 52px);
        display: flex;
        flex-direction: column;
        gap: 1px;
        overflow-x: hidden;
        overflow-y: auto;
        background-color: inherit;
        box-shadow: $elevation-default;
    }

</style>
