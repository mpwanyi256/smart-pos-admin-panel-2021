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
              <BaseTextfield v-model="search" placeholder="Search for a menu item" />
            </div>
          </th>
          <th>Category</th>
          <th>Menu price</th>
          <th>Average Cost price</th>
          <th>Recipe</th>
        </tr>
      </template>
      <template slot="body">
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
  },
  data() {
    return {
      showRecipe: false,
      menuItemSelected: null,
      search: '',
    };
  },
  computed: {
    ...mapGetters('menu', ['menuItems']),

    filteredMenuItems() {
      return this.menuItems.filter((Item) => Item.name.toLowerCase()
        .match(this.search.toLowerCase()));
    },
  },
  async created() {
    await this.getMenuItems({ department_id: 'all' });
  },
  methods: {
    ...mapActions('menu', ['getMenuItems']),

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
      this.showRecipe = false;
      await this.getMenuItems({ department_id: 'all' });
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
    height: calc(100vh - 62px);
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    color: $black;
  }

  .item_name {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: left;
    align-items: center;

    .download_btn {
      background-color: $green !important;
      color: $white !important;
    }
  }

  .no_purchases {
    color: $red;
  }
</style>
