<template>
  <div class="categories">
    <div class="search_area">
      <p>Categories</p>
      <div class="search">
        <input @keyup="searchFilter" type="text"
        v-model="search"
        class="search_field" placeholder="Search" />
      </div>
    </div>
    <div class="categories_list">
      <template v-if="loading">
        <MenuLoader
          v-for="i in 4"
          :key="`cat-holder-key-${i}`"
          :count="8"
        />
      </template>
      <template v-else>
      <CategoryItem
        v-for="category in categories" :key="category.id"
        :category="category"
        @filter="$emit('filterMenu', $event)"
      />
      </template>
    </div>
  </div>
</template>
<script>
import CategoryItem from '@/components/pos/menu/CategoryItem.vue';
import MenuLoader from '@/components/pos/menu/MenuLoader.vue';

export default {
  name: 'Categories',
  components: {
    CategoryItem,
    MenuLoader,
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      search: '',
    };
  },
  methods: {
    searchFilter() {
      this.$emit('search', this.search);
    },
  },
};
</script>
<style lang="scss">
@import '@/styles/pos.scss';

.categories {
  height: calc(50vh - 52px);
  background-color: $white;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .search_area {
    height: 56px;
    display: grid;
    grid-template-columns: 50% 50%;
    align-items: center;
    border-bottom: 1px solid $bg_color;
    background-color: $header;
    color: $black-text;

    p {
      margin: 10px;
      text-align: left;
      font-size: 16px;
      color: $black-text;
    }

    .search {
      direction: rtl;

      .search_field {
        height: 35px;
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
  }

  .categories_list {
    max-height: calc(50vh - 108px);
    overflow-y: scroll;
    overflow-x: hidden;
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
  }
}
</style>
