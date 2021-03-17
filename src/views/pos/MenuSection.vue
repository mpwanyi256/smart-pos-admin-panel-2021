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
      />
    </div>
</template>
<script>
import Categories from '@/components/pos/menu/Categories.vue';
import MenuItems from '@/components/pos/menu/MenuItems.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'MenuSection',
  components: {
    Categories,
    MenuItems,
  },
  data() {
    return {
      categorySearchKey: '',
    };
  },
  computed: {
    ...mapGetters('pos', ['menuItems', 'categories']),
    filteredCategories() {
      return this.categories.filter((Cat) => Cat.name.toLowerCase()
        .match(this.categorySearchKey.toLowerCase()));
    },
  },
  methods: {
    ...mapActions('pos', ['getMenuItems', 'getMenuCategories']),

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
    }

</style>
