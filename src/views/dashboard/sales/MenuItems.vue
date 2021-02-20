<template>
    <div class="menu_items_section">
        <div class="header_section">
            <div class="head_title"><h2>Menu Items</h2></div>
            <div class="search_area">
                <v-select
                    outlined
                    label="Department"
                    v-model="departmentSelected" dense
                    item-text="name"
                    item-value="id"
                    :items="departments"
                />
            </div>
            <v-text-field label="Search items"
            :v-model="itemSearch"
            dense outlined placeholder="Search" />
        </div>
        <LinearLoader v-if="loading" />
        <template v-else>
            <MenuItemsDisplayHeader />
            <div class="menu_items_display_section">
                <MenuItem v-for="(item, i) in menuItemsFiltered" :key="i"
                    :menu-item="item"
                />
            </div>
        </template>
    </div>
</template>
<script>
import MenuItem from '@/components/menu/MenuItem.vue';
import MenuItemsDisplayHeader from '@/components/menu/MenuItemsDisplayHeader.vue';
import LinearLoader from '@/components/generics/Loading.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'MenuItems',
  components: {
    MenuItem,
    MenuItemsDisplayHeader,
    LinearLoader,
  },
  data() {
    return {
      menuItems: [],
      departments: [{ id: 0, name: 'ALL' }],
      departmentSelected: 0,
      itemSearch: '',
    };
  },
  computed: {
    ...mapGetters('sales', ['loading']),
    menuItemsFiltered() {
      if (this.itemSearch.length > 2) {
        return this.menuItems.filter((Item) => Item.name.toLowerCase()
          .match(this.itemSearch.toLowerCase()));
      }
      const filtered = this.menuItems.filter((Item) => Item.display === this.departmentSelected);
      return parseInt(this.departmentSelected, 10) === 0 ? this.menuItems : filtered;
    },
  },
  methods: {
    ...mapActions('sales', ['getMenuItems', 'getDepartments', 'fetchItemsSold']),

    async fetchMenuDepartments() {
      const departments = await this.getDepartments();
      if (!departments.error) {
        this.departments = [
          { id: 0, name: 'ALL' },
          ...departments.data,
        ];
      }
    },
    async fetchMenuItems() {
      const filters = { item_id: this.menuItemSelected };
      const menuItems = await this.getMenuItems(filters);
      if (!menuItems.error) this.menuItems = menuItems.data;
    },
  },
  mounted() {
    this.fetchMenuDepartments();
    this.fetchMenuItems();
  },
};
</script>
<style scoped lang="scss">
@import '../../../styles/constants.scss';

    .menu_items_section {
        background-color: inherit;
        width: 100%;
        min-height: 100%;
        display: flex;
        flex-direction: column;

        .header_section {
            height: 60px;
            width: 100%;
            display: grid;
            grid-template-columns: 50% 25% 25%;
            background-color: $white;
            gap: 5px;
            // justify-items: left;
            text-align: left;
            padding: 15px;
            overflow: hidden;
        }

        .menu_items_display_section {
            background-color: $white;
            height: calc(100vh - 162px);
            overflow-y: auto;
            overflow-x: hidden;
            border: 0.5px solid $light-grey;
            display: flex;
            flex-direction: column;
        }
    }
</style>
