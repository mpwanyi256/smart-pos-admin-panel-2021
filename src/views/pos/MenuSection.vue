<template>
    <div class="menu_categories">
      <Categories
        :categories="filteredCategories"
        @filterMenu="filterMenuByCategory"
        @search="categorySearchKey = $event"
      />
      <MenuItems
        :items="menuItems"
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
import { mapActions, mapGetters, mapMutations } from 'vuex';

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
    ...mapGetters('pos', ['menuItems', 'categories', 'runningOrderId']),
    ...mapGetters('auth', ['user']),

    dayOpen() {
      return this.user ? this.user.company_info.day_open : null;
    },

    filteredCategories() {
      return this.categories.filter((Cat) => Cat.name.toLowerCase()
        .match(this.categorySearchKey.toLowerCase()));
    },
  },
  methods: {
    ...mapActions('pos', ['getMenuItems', 'getMenuCategories', 'createNewOrder', 'addOrderItem']),
    ...mapMutations('pos', ['setRunningOrder', 'setRunningOrderId']),
    ...mapActions('sales', ['filterOrders']),

    async addItemToOrder(menuItem) {
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
      else this.$eventBus.$emit('fetch-items');
    },

    async createOrder() {
      if (!this.user) return;
      const filters = {
        company_id: this.user.company_id,
        user_id: this.user.id,
        date: this.dayOpen,
        time: this.time,
      };
      const order = await this.createNewOrder(filters);
      if (!order.error) {
        const createdOrderId = order.order_id;
        // Get new Order Info
        const newOrder = await this.filterOrders({
          from: '',
          to: '',
          client_id: '',
          bill_no: createdOrderId,
        });

        if (!newOrder.error) {
          if (newOrder.data.orders) this.setRunningOrder(newOrder.data.orders[0]);
        }

        this.setRunningOrderId(order.order_id);
        localStorage.setItem('smart_running_order', createdOrderId);
        this.$eventBus.$emit('fetch-orders');
        this.$eventBus.$emit('fetch-items');
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
