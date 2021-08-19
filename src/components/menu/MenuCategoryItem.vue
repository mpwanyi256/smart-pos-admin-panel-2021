<template>
    <div class="menu_item">
        <div class="item_name">
            <template v-if="updateCategory">
              <input type="text" @keyup.enter="updateMenuCatItem"
                v-model="updatedItemName" class="update_input" />
              <v-btn small @click="updateMenuCatItem">Update</v-btn>
              <v-btn small color="red darken-3" dark @click="cancelUpdate">cancel</v-btn>
            </template>
            <template v-else>
              <div @click="updateCategory = true">
                {{ categoryItem.name }}
              </div>
            </template>
        </div>
        <LinearLoader v-if="loading" />
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import LinearLoader from '@/components/generics/Loading.vue';

export default {
  name: 'MenuCategoryItem',
  components: {
    LinearLoader,
  },
  props: {
    categoryItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      updateCategory: false,
      updatedItemName: '',
      loading: false,
    };
  },
  computed: {
    isHidden() {
      // eslint-disable-next-line eqeqeq
      return this.categoryItem ? this.categoryItem.status == 1 : false;
    },
  },
  created() {
    this.updatedItemName = this.categoryItem.name;
  },
  methods: {
    ...mapActions('menu', ['updateMenuItemCategoryName', 'getMenuCategories']),

    cancelUpdate() {
      this.updateCategory = false;
      this.updatedItemName = this.categoryItem.name;
    },

    async updateMenuCatItem() {
      this.updateCategory = false;
      this.loading = true;
      const catUpdate = {
        name: this.updatedItemName,
        id: this.categoryItem.id,
      };
      await this.updateMenuItemCategoryName(catUpdate);
      await this.getMenuCategories();
      console.log('update', catUpdate);
      this.loading = false;
    },
  },
};
</script>
<style scoped lang="scss">
@import '../../styles/constants.scss';

    .menu_item {
        height: auto;
        background-color: inherit;
        display: inline-flex;
        justify-content: left;
        align-items: center;
        padding-left: 15px;
        padding-right: 15px;
        color: $black-text;
        size: 14px;
        border: none !important;

        .item_name {
            padding-right: 15px;
            line-height: 1.5;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 100%;
            white-space: nowrap;
            text-align: left;
            display: flex;
            flex-direction: row;
            gap: 10px;

            > div {
              width: 100%;
              border: none;
            }

            .update_input {
              height: 100%;
              width: 100%;
              border: 1px solid $dark-grey;
              border-radius: 5px;
              padding: 6px;
            }
        }

        .item_action {
            display: grid;
            grid-template-columns: 50% 50%;
            justify-content: right;
            direction: rtl;
            gap: 5px;

            .recipe_button {
              background-color: $light-grey;
            }

            .update_button {
                background-color: $dark-grey;
                color: $white !important;
                padding: 3px;
            }

            .toggle_hide_button {
                width: 50px;
            }
        }
    }

    .menu_item:hover {
        // border: 1px solid $border-color;
        cursor: pointer;
        color: $black;
    }

    .hidden {
        background-color: rgb(248, 198, 198);
        color: $black;
    }

</style>
