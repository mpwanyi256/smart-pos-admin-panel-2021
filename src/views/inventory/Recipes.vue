<template>
  <div class="recipes_main">
    <Table class="recipes_table">
      <template slot="header">
        <tr>
          <th>
            <div class="item_name">
              <BaseTooltip
                @button="downloadCSV"
                message="Download receipes" icon="download"
                color="green"
              />
              <BaseTextfield v-model="search" placeholder="Search" />
              <v-select
                dense outlined
                label="Department"
                :items="departments"
                item-text="name"
                item-value="id"
                v-model="display"
              />
            </div>
          </th>
          <th>Category</th>
          <th>Menu price</th>
          <th>Average Cost price</th>
          <th>Recipe</th>
        </tr>
      </template>
      <template slot="body" v-if="loading">
        <tr>
          <td colspan="5">
            <LinearLoader />
          </td>
        </tr>
      </template>
      <template slot="body" v-else>
        <tr v-for="item in filteredMenuItems" :key="item.id">
          <td>{{ item.name }}</td>
            <td>{{ item.category }}</td>
          <td>{{ item.price_display }}</td>
          <td :class="[{no_purchases : item.average_cost_price == '0'}]">
              {{ item.average_cost_price == '0' ?
              'No purchases found' : item.average_cost_price }}</td>
          <td>
            <v-btn small text @click="viewRecipeInfo(item)">
              View
            </v-btn>
          </td>
        </tr>
      </template>
    </Table>
    <MenuItemRecipeModal
      v-if="showRecipe && menuItemSelected"
      :menuItem="menuItemSelected"
      @close="reloadReceipes"
    />
  </div>
</template>
<script>
import Table from '@/components/generics/new/Table.vue';
import BaseTooltip from '@/components/generics/BaseTooltip.vue';
import MenuItemRecipeModal from '@/components/inventory/store/MenuItemRecipeModal.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import LinearLoader from '@/components/generics/Loading.vue';
import DownloadCSVMixin from '@/mixins/DownloadCSVMixin';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'InventoryRecipes',
  mixins: [DownloadCSVMixin],
  components: {
    Table,
    MenuItemRecipeModal,
    BaseTextfield,
    BaseTooltip,
    LinearLoader,
  },
  data() {
    return {
      showRecipe: false,
      menuItemSelected: null,
      search: '',
      display: 0,
      loading: false,
    };
  },
  computed: {
    ...mapGetters('menu', ['menuItems', 'departments']),

    filteredMenuItems() {
      return this.menuItems.filter((Item) => Item.name.toLowerCase()
        .match(this.search.toLowerCase()));
    },
  },
  watch: {
    display() {
      this.reloadReceipes();
    },
  },
  async created() {
    await this.getMenuItems({ department_id: 'all' });
    await this.fetchMenuDepartments();
  },
  methods: {
    ...mapActions('menu', ['getMenuItems', 'getDepartments']),

    async fetchMenuDepartments() {
      await this.getDepartments(0);
    },

    downloadCSV() {
      this.reloadReceipes();
      const data = this.menuItems.map((Item) => ({
        menu_item_name: Item.name.toUpperCase(),
        category: Item.category,
        sale_price: Item.price_display,
        average_cost_price: Item.average_cost_price,
      }));
      this.download(data, 'Menu receipe');
    },

    async reloadReceipes() {
      this.loading = true;
      this.showRecipe = false;
      await this.getMenuItems({ department_id: this.display });
      this.loading = false;
    },

    viewRecipeInfo(item) {
      this.menuItemSelected = item;
      this.showRecipe = true;
    },
  },
};
</script>
<style lang="scss">
@import '@/styles/constants.scss';

  .recipes_main {
    height: calc(100vh - 52px);
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    color: $black;
  }

  .item_name {
    width: 100%;
    display: inline-flex;
    gap: 15px;
    padding-top: 5px;
    direction: ltr;
    padding-right: 15px;
    text-align: left;

    .download_btn {
      background-color: $green !important;
      color: $white !important;
    }
  }

  .no_purchases {
    color: $red;
  }

  ::v-deep .v-input__control {
    top: 0;
    bottom: 0;
  }
</style>
