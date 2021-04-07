<template>
  <div class="recipe_knock_off">
    <template v-if="!update">
      <div @click="update = !update">
      {{ `${recipeItem.ko_quantity} ${recipeItem.measure}` }}
    </div>
    </template>
    <template v-else>
      <div class="knock_off_update">
        <input type="text" v-model="updated_knock_off"
        class="search_field" placeholder="Enter amount" />
        <v-btn small @click="updateItemKnockOff">Update</v-btn>
        <v-btn x-small icon class="red--text darken-3"
          @click="update = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </template>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'RecipeItemKnockOff',
  props: {
    recipeItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      update: false,
      updated_knock_off: 0,
    };
  },
  created() {
    this.updated_knock_off = this.recipeItem.ko_quantity;
  },
  methods: {
    ...mapActions('inventory', ['updateItem']),

    async updateItemKnockOff() {
      const recipeUpdate = {
        update_recipe_knock_off: this.recipeItem.id,
        knock_off: this.updated_knock_off,
      };
      await this.updateItem(recipeUpdate);
      this.$emit('refresh');
      this.update = false;
    },
  },
};
</script>
<style lang="scss">
@import '@/styles/constants.scss';

  .recipe_knock_off {
    cursor: pointer;
    height: inherit;

    .knock_off_update {
      display: inline-flex;
      flex-direction: row;
      gap: 5px;
      align-items: center;
    }

    .search_field, .search_field:focus {
      height: 35px;
      width: 100px;
      border: 1px solid $white;
      background-color: $white;
      border-radius: 5px;
      margin-right: 10px;
      direction: ltr;
      padding-left: 5px;
      padding-right: 5px;
      box-shadow: $elevation-default;
    }
  }

  .recipe_knock_off:hover {
    // border: 1px solid $border-color;
    // box-shadow: $shadow;
  }
</style>
