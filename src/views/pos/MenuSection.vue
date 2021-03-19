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
    };
  },
  computed: {
    ...mapGetters('pos', ['menuItems', 'categories']),
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
    ...mapActions('pos', ['getMenuItems', 'getMenuCategories', 'createNewOrder']),
    ...mapMutations('pos', ['setRunningOrder']),
    ...mapActions('sales', ['filterOrders']),

    async createOrder() {
      if (!this.user) return;
      const filters = {
        company_id: this.user.company_id,
        user_id: this.user.id,
        date: this.today,
        time: this.time,
      };
      const order = await this.createNewOrder(filters);
      if (!order.error) {
        const createdOrderId = order.order_id;
        localStorage.setItem('smart_running_order', createdOrderId);
        const filter = {
          bill_no: createdOrderId,
          from: '',
          to: '',
          client_id: '',
        };

        const orderInfo = await this.filterOrders(filter);
        this.setRunningOrder({ order_id: orderInfo.data[0] });
        console.log('Order info', orderInfo.data);
      } else console.info(order.message);
    },

    searchForAMenuItem(searchKey) {
      console.log('Search', searchKey);
      setTimeout(() => {
        this.getMenuItems({ category_id: 'all', item_name: searchKey.trim() });
      }, 100);
    },

    filterMenuByCategory(categoryId) {
      console.log('Filter by', categoryId);
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
