<template>
  <div class="menu_categories">
    <div class="header_section">
        <div class="head_title">
            <h2>
            Menu Item categories</h2>
        </div>
        <div class="search_area">
            <v-text-field :label="`Search`"
              v-model="key" dense outlined placeholder="Search" />
            <BaseTooltip message="Create new category" icon="plus"
              @button="createCategory = true" />
        </div>
    </div>
    <LinearLoader v-if="loading" />
    <div class="categories_listing">
      <div class="menu_items_display_section">
        <MenuCategoryItem v-for="(item, i) in filteredCategories" :key="i"
            :category-item="item"
            @changeStatus="updateCategoryStatus"
            @update="updateItem"
        />
      </div>
    </div>
    <CreateNewCategoryModal
      v-if="createCategory"
      @close="createCategory = false"
      @refresh="refresh"
    />
  </div>
</template>
<script>
import BaseTooltip from '@/components/generics/BaseTooltip.vue';
import LinearLoader from '@/components/generics/Loading.vue';
import MenuCategoryItem from '@/components/menu/MenuCategoryItem.vue';
import CreateNewCategoryModal from '@/components/menu/CreateNewCategoryModal.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'MenuCategories',
  components: {
    BaseTooltip,
    LinearLoader,
    MenuCategoryItem,
    CreateNewCategoryModal,
  },
  data() {
    return {
      loading: true,
      key: '',
      createCategory: false,
    };
  },
  computed: {
    ...mapGetters('menu', ['categories']),
    filteredCategories() {
      return this.categories.filter((Cat) => Cat.name.toLowerCase().match(this.key.toLowerCase()));
    },
  },
  methods: {
    ...mapActions('menu', ['getMenuCategories', 'updateMenuItemCategory']),

    async updateCategoryStatus(cat) {
      this.loading = true;
      await this.updateMenuItemCategory(cat);
      await this.getMenuCategories();
      this.loading = false;
    },

    async refresh() {
      await this.getMenuCategories();
      this.loading = false;
    },
  },
  async created() {
    await this.getMenuCategories();
    this.loading = false;
  },
};
</script>
<style scoped lang="scss">
@import '../../../styles/constants.scss';

  .menu_categories {
    background-color: inherit;
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;

    .header_section {
        height: 60px;
        width: 100%;
        display: grid;
        grid-template-columns: 60% 40%;
        background-color: $white;
        gap: 10px;
        text-align: left;
        padding: 15px;
        overflow: hidden;

        .head_title h2 span {
          display: inline-flex;
          gap: 5px;
        }

        .search_area {
          display: inline-flex;
          gap: 5px;
        }
    }

    .categories_listing {
      background-color: $white;
      height: calc(100vh - 120px);
      overflow-y: auto;
      overflow-x: hidden;
      border: 0.5px solid $light-grey;
      display: flex;
      flex-direction: column;
      margin-top: 5px;

      .menu_items_display_section {
        background-color: $white;
        height: calc(100vh - 112px);
        overflow-y: auto;
        overflow-x: hidden;
        border: 0.5px solid $light-grey;
        display: flex;
        flex-direction: column;
      }
    }
  }
</style>
