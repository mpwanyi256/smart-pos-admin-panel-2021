<template>
  <Basemodal :title="menuItem.name" :size="800" @close="$emit('close')">
    <div class="recipe_view">
      <Table>{{ recipe }}
        <template slot="header">
          <tr>
            <th>Store Item</th>
            <th>Category</th>
            <th>Knock off</th>
            <th>Measure</th>
            <th>Avg price</th>
            <th>&nbsp;</th>
          </tr>
        </template>
        <template slot="body">
          <tr v-for="item in recipe" :key="item.id">
            <td>{{ item.name }}</td>
          </tr>
        </template>
      </Table>
    </div>
  </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';
import Table from '@/components/generics/new/Table.vue';
import { mapActions } from 'vuex';

export default {
  name: 'MenuItemRecipeModal',
  components: {
    Basemodal,
    Table,
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
    };
  },
  async created() {
    this.recipe = await this.getItemRecipe({ menu_item_id: this.menuItem.id });
  },
  methods: {
    ...mapActions('inventory', ['getItemRecipe']),
  },
};
</script>
<style scoped lang="scss">
  .recipe_view {
    height: 450px;
    overflow: auto;
  }
</style>
