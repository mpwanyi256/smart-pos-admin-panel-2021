<template>
  <div class="categories">
    <div class="search_area">
      <p>Categories</p>
      <div class="search">
        <input type="text" class="search_field" placeholder="Search" />
      </div>
    </div>
    <div class="categories_list">
      <CategoryItem v-for="i in 80" :key="i" />
    </div>
  </div>
</template>
<script>
import CategoryItem from '@/components/pos/menu/CategoryItem.vue';

export default {
  name: 'Categories',
  components: {
    CategoryItem,
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
    justify-content: left;
    align-items: center;
    border-bottom: 1px solid $bg_color;

    p {
      margin-left: 15px;
      font-size: 16px;
      color: $black-text;
    }

    .search {
      direction: rtl;

      .search_field {
        height: 35px;
        border: 1px solid $bg_color;
        border-radius: 5px;
        margin-right: 10px;
        direction: ltr;
        padding-left: 5px;
        padding-right: 5px;
      }
    }
  }

  .categories_list {
    max-height: calc(50vh - 108px);
    overflow-y: auto;
    overflow-x: hidden;
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
  }
}
</style>
