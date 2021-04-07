<template>
  <div class="new_recipe_item_entry">
    <div>
      <div class="select_store_item">
        <div class="store_item_select">
          <h3>Select store item</h3>
          <BaseTextfield
            v-model="store_items_filter"
            class="input_field"
            placeholder="Find a store item"
          />
          <div class="menu_items_filter">
            <div class="store_column">
              <div
                v-for="i in filteredItems"
                :key="i.id"
                @click="selected_store_item = i"
                :class="isSelected(i.id) ? 'is_selected' : ''">
                {{ i.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div v-if="selected_store_item" class="knock_off_entry">
        <h3>{{ selected_store_item.name }}</h3>
        <div class="frm_entry">
          <div>
            <div>Enter Knock off in {{ selected_store_item.unit_measure.toLowerCase() }}</div>
            <div>
              <BaseTextfield v-model="knockOffQuantity"
              :placeholder="`Enter ${selected_store_item.unit_measure}`" />
              <v-btn
                :disabled="!knockOffQuantity"
                block small class="mt-4 btn_add_knockoff"
                @click="addRecipeItem">
                Add item
              </v-btn>
              <p>{{ message }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AddRecipeItemRow',
  props: {
    menuItem: {
      type: Object,
      required: true,
    },
  },
  components: {
    BaseTextfield,
  },
  data() {
    return {
      store_items_filter: '',
      selected_store_item: null,
      knockOffQuantity: '',
      message: '',
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),
    ...mapGetters('inventory', ['storeItems']),
    filteredItems() {
      return this.storeItems.filter((Item) => Item.name.toLowerCase()
        .match(this.store_items_filter.toLowerCase()));
    },
  },
  methods: {
    ...mapActions('inventory', ['getStoreItems', 'updateItem']),
    isSelected(id) {
      return this.selected_store_item ? this.selected_store_item.id === id : false;
    },

    async addRecipeItem() {
      const recipe = {
        store_item_id: this.selected_store_item.id,
        menu_item: this.menuItem.id,
        knock_off: this.knockOffQuantity,
        added_by: this.user.id,
        add_recipe_item: this.selected_store_item.id,
        company_id: this.user.company_id,
      };
      const recipeAdd = await this.updateItem(recipe);
      if (!recipeAdd.error) this.$emit('refresh');
      this.message = recipeAdd.message;
      setTimeout(() => {
        this.message = '';
      }, 2000);
    },
  },
  async created() {
    await this.getStoreItems({ company_id: this.user.company_id });
  },
};
</script>
<style lang="scss">
@import '@/styles/constants.scss';

.new_recipe_item_entry {
  width: inherit;
  background-color: $white !important;
  height: 300px;
  font-family: $font-style;
  display: grid;
  grid-template-columns: 40% 60%;
  overflow: hidden;

  h3 {
    margin: 5px;
  }

  div {
    .select_store_item {
      display: flex;
      flex-direction: column;
      gap: 5px;
      border: 1px solid $border-color;
      border-radius: 5px;
      box-shadow: $elevation-low;

        .input_field {
          margin: 5px;
          color: $grey;
        }

        .menu_items_filter {
          height: calc(300px - 60px);
          overflow-y: auto;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;

          .store_column {
            >div {
              display: flex;
              align-items: center;
              padding-left: 5px;
              padding-right: 5px;
              cursor: pointer;
              height: 50px;
              font-size: 16px;
            }

            >div:hover {
              background-color: $light-grey;
            }

            .is_selected, .is_selected:hover {
              background-color: $grey !important;
              color: $white !important;
            }
          }
        }
    }

    .knock_off_entry {
      display: flex;
      flex-direction: column;
      gap: 5px;
      padding: 15px;

      .frm_entry >div {
        display: grid;
        grid-template-columns: 40% 60%;
        height: calc(300px - 35px);
        >div {
          .btn_add_knockoff {
            background-color: $blue !important;
            color: $white;
          }
        }
      }
    }
  }
}
</style>
