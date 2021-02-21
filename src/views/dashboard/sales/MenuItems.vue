<template>
    <div class="menu_items_section">
        <div class="header_section">
            <div class="head_title">
                <h2>
                    <span>
                        <v-btn
                            icon
                            class="create_menu_item_icon"
                            dark @click="updateModal = true">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </span>
                    Menu Items</h2>
            </div>
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
            v-model="itemSearch"
            dense outlined placeholder="Search" />
        </div>
        <LinearLoader v-if="loading" />
        <template v-else>
            <MenuItemsDisplayHeader />
            <div class="menu_items_display_section">
                <MenuItem v-for="(item, i) in menuItemsFiltered" :key="i"
                    :menu-item="item"
                    @changeStatus="updateMenuItemStatus"
                    @update="updateItem"
                />
            </div>
        </template>
        <UpdateMenuItem
          v-if="updateModal"
          @close="updateModal = false"
        />
        <ConfirmModal
          v-if="openConfirmModal"
          :title="confirmTitle"
          @yes="updateStatus"
          @close="openConfirmModal = false"
        />
    </div>
</template>
<script>
import MenuItem from '@/components/menu/MenuItem.vue';
import MenuItemsDisplayHeader from '@/components/menu/MenuItemsDisplayHeader.vue';
import LinearLoader from '@/components/generics/Loading.vue';
import UpdateMenuItem from '@/components/menu/UpdateMenuItem.vue';
import ConfirmModal from '@/components/generics/ConfirmModal.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'MenuItems',
  components: {
    MenuItem,
    MenuItemsDisplayHeader,
    LinearLoader,
    UpdateMenuItem,
    ConfirmModal,
  },
  data() {
    return {
      departmentSelected: 0,
      itemSearch: '',
      updateModal: false,
      menuItemSelected: null,
      openConfirmModal: false,
      confirmTitle: '',
      selectedDepartmentId: 0,
    };
  },
  watch: {
    async departmentSelected(val) {
      const filters = { department_id: val };
      await this.getMenuItems(filters);
    },
  },
  computed: {
    ...mapGetters('menu', ['menuItems', 'departments', 'loading']),

    menuItemsFiltered() {
      return this.menuItems.filter((Item) => Item.name.toLowerCase()
        .match(this.itemSearch.toLowerCase()));
    },
  },
  methods: {
    ...mapActions('menu', ['getMenuItems', 'getDepartments', 'toggleLoad', 'updateItemStatus']),

    updateItem(item) {
      console.log('Update', item);
    },

    fetchMenuDepartments() {
      this.getDepartments(this.selectedDepartmentId);
    },
    async fetchMenuItems() {
      const filters = { item_id: this.selectedDepartmentId };
      await this.getMenuItems(filters);
    },
    updateMenuItemStatus(item) {
      this.menuItemSelected = item;
      if (item.status === 1) {
        this.confirmTitle = 'Show Item';
      } else this.confirmTitle = 'Hide item';
      this.openConfirmModal = true;
    },
    async updateStatus() {
      this.openConfirmModal = false;
      await this.updateItemStatus(this.menuItemSelected);
      await this.fetchMenuItems();
    },
  },
  async mounted() {
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

    .create_menu_item_icon {
      background-color: $dark-grey;
    }
</style>
