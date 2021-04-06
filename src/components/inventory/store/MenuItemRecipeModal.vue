<template>
  <Basemodal :title="menuItem.name" :size="900" @close="$emit('close')">
    <template slot="action">
      <v-btn v-if="hasRecipe" small class="mr-3 add_receipe_button"
        @click="addRecipe = !addRecipe">
        <v-icon left>
          {{ !addRecipe ? 'mdi-plus' : 'mdi-eye' }}
        </v-icon>
        {{ !addRecipe ? 'Add item to recipe' : 'Show all items' }}
      </v-btn>
    </template>
    <div class="recipe_view">
      <Table v-if="hasRecipe && !loading">
        <template slot="header">
          <tr>
            <th>
              <div class="store_item_name">
                Store Item name
              </div>
            </th>
            <th>Avg price</th>
            <th>pack size</th>
            <th>Knock off</th>
            <th>Measure</th>
            <th>Delete</th>
          </tr>
        </template>
        <template slot="body">
          <tr v-if="addRecipe">
            <td colspan="6">
              <AddRecipeItemRow
                @close="addRecipe = false"
                @refresh="fetchRecipe"
                :menuItem="menuItem" />
            </td>
          </tr>
          <template v-else>
          <tr v-for="storeItem in recipe" :key="storeItem.id">
            <td>{{ storeItem.name }}</td>
            <td>{{ storeItem.average_price_display == '0' ?
              'No purchases made' : storeItem.average_price_display }}
            </td>
            <td>{{ storeItem.pack_size }}</td>
            <td>
              <RecipeItemKnockOff
                @refresh="fetchRecipe"
                :recipeItem="storeItem"
              />
            </td>
            <td>{{ storeItem.measure }}</td>
            <td>
              <v-btn @click="deleteRecipe(storeItem.id)" small icon class="red--text darken--3">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
          </template>
        </template>
      </Table>
      <div v-else class="empty_state">
        <template v-if="addRecipe">
          <AddRecipeItemRow
            @close="addRecipe = false"
            @refresh="fetchRecipe"
            v-if="addRecipe"
            :menuItem="menuItem" />
        </template>
        <template v-else>
          <h1> No recipe set</h1>
          <v-btn small class="add_receipe_button"
            @click="addRecipe = !addRecipe">
            <v-icon>
              {{ !addRecipe ? 'mdi-plus' : 'mdi-close' }}
            </v-icon>
            {{ !addRecipe ? 'Add items to recipe' : 'Show all items' }}
          </v-btn>
        </template>
      </div>
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
// import BaseTooltip from '@/components/generics/BaseTooltip.vue';
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
    // BaseTooltip,
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
      loading: true,
    };
  },
  async created() {
    this.fetchRecipe();
  },
  computed: {
    hasRecipe() {
      return this.recipe.length > 0;
    },
  },
  methods: {
    ...mapActions('inventory', ['getItemRecipe', 'updateItem']),

    async fetchRecipe() {
      this.loading = true;
      this.recipe = await this.getItemRecipe({ menu_item_id: this.menuItem.id });
      this.loading = false;
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
@import '@/styles/constants.scss';

  .recipe_view {
    height: 450px;
    overflow: auto;

    .empty_state {
      width: 100%;
      height: inherit;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }
  }

  .add_receipe_button {
    background-color: $blue !important;
    color: $white;
  }
</style>
