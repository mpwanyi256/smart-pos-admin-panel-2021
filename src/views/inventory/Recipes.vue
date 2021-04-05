<template>
  <div class="recipes_main">
    <Table class="recipes_table">
      <template slot="header">
        <tr>
          <th>Menu Item</th>
          <th>Department</th>
          <th>Menu price</th>
          <th>Cost price</th>
          <th>Recipe</th>
        </tr>
      </template>
      <template slot="body">
        <tr v-for="item in menuItems" :key="item.id">
          <td>{{ item.name }}</td>
            <td>{{ item.category }}</td>
          <td>{{ item.price_display }}</td>
          <td>2,000</td>
          <td>
            <v-btn small raised @click="viewRecipeInfo(item)">
              View
            </v-btn>
          </td>
        </tr>
      </template>
    </Table>
    <MenuItemRecipeModal
      v-if="showRecipe && menuItemSelected"
      :menuItem="menuItemSelected"
      @close="showRecipe = false"
    />
  </div>
</template>
<script>
import Table from '@/components/generics/new/Table.vue';
import MenuItemRecipeModal from '@/components/inventory/store/MenuItemRecipeModal.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'InventoryRecipes',
  components: {
    Table,
    MenuItemRecipeModal,
  },
  data() {
    return {
      showRecipe: false,
      menuItemSelected: null,
    };
  },
  computed: {
    ...mapGetters('menu', ['menuItems']),
  },
  async created() {
    await this.getMenuItems({ department_id: 'all' });
  },
  methods: {
    ...mapActions('menu', ['getMenuItems']),

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
</style>
