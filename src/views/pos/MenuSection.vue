<template>
    <div class="menu_categories">
      <Categories />
      <MenuItems />
    </div>
</template>
<script>
import Categories from '@/components/pos/menu/Categories.vue';
import MenuItems from '@/components/pos/menu/MenuItems.vue';

export default {
  name: 'MenuSection',
  components: {
    Categories,
    MenuItems,
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/pos.scss';

    .menu_categories {
        width: 100%;
        height: calc(100vh - 52px);
        display: flex;
        flex-direction: column;
        gap: 1px;
        overflow-x: hidden;
        overflow-y: auto;
        background-color: inherit;
    }

</style>
