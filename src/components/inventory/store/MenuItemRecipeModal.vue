<template>
  <Basemodal :title="menuItem.name" :size="900" @close="$emit('close')">
    <template slot="action">
      <BaseTooltip color="blue"
         class="mr-2"
        @button="addRecipe = !addRecipe"
        message="Add new recipe item"
        :icon="!addRecipe ? 'plus' : 'close'"
      />
    </template>
    <div class="recipe_view">
      <Table>
        <template slot="header">
          <tr>
            <th>
              <div class="store_item_name">
                Store Item name
              </div>
            </th>
            <th>Knock off</th>
            <th>Measure</th>
            <th>Avg price</th>
            <th>Delete</th>
          </tr>
        </template>
        <template slot="body">
          <AddRecipeItemRow
            @close="addRecipe = false"
            @refresh="fetchRecipe"
            v-if="addRecipe"
            :menuItem="menuItem" />
          <tr v-for="storeItem in recipe" :key="storeItem.id">
            <td>{{ storeItem.name }}</td>
            <td>
              <RecipeItemKnockOff
                @refresh="fetchRecipe"
                :recipeItem="storeItem"
              />
            </td>
            <td>{{ storeItem.measure }}</td>
            <td>{{ storeItem.average_price_display }}</td>
            <td>
              <v-btn @click="deleteRecipe(storeItem.id)" small icon class="red--text darken--3">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </Table>
    </div>
    <ConfirmModal
      v-if="confirmDelete && selectedItem"
      @close="confirmDelete = false"
      @yes="dropRecipeItem"
    />
  </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';
import BaseTooltip from '@/components/generics/BaseTooltip.vue';
import ConfirmModal from '@/components/generics/ConfirmModal.vue';
import Table from '@/components/generics/new/Table.vue';
import RecipeItemKnockOff from '@/components/inventory/store/RecipeItemKnockOff.vue';
import AddRecipeItemRow from '@/components/inventory/store/AddRecipeItemRow.vue';
import { mapActions } from 'vuex';

export default {
  name: 'MenuItemRecipeModal',
  components: {
    Basemodal,
    Table,
    BaseTooltip,
    RecipeItemKnockOff,
    AddRecipeItemRow,
    ConfirmModal,
  },
  props: {
    menuItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      recipe: [],
      addRecipe: false,
      confirmDelete: false,
      selectedItem: null,
    };
  },
  async created() {
    this.fetchRecipe();
  },
  methods: {
    ...mapActions('inventory', ['getItemRecipe', 'updateItem']),

    async fetchRecipe() {
      this.recipe = await this.getItemRecipe({ menu_item_id: this.menuItem.id });
    },

    deleteRecipe(itemId) {
      this.selectedItem = itemId;
      this.confirmDelete = true;
    },

    async dropRecipeItem() {
      const dropReceipe = {
        drop_receipe_item: this.selectedItem,
      };
      await this.updateItem(dropReceipe);
      await this.fetchRecipe();
      this.confirmDelete = false;
    },
  },
};
</script>
<style scoped lang="scss">
  .recipe_view {
    height: 450px;
    overflow: auto;
  }
</style>
