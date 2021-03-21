<template>
  <div class="menu_listing">
    <div class="search_area">
      <p>ITEMS</p>
      <div class="search">
        <input type="text" v-model="menuSearchKey"
          class="search_field" placeholder="Search" />
        <v-btn @click="$emit('create-order')" text class="btn_create_order">
          <v-icon left>mdi-plus</v-icon>
          Create new order
        </v-btn>
      </div>
    </div>
    <div class="menu_items_list">
      <div class="menu">
        <MenuItem
          v-for="item in items" :key="item.id"
          :item="item"
          @addItem="$emit('addItem', $event)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import MenuItem from '@/components/pos/menu/MenuItem.vue';

export default {
  name: 'MenuItems',
  components: {
    MenuItem,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      menuSearchKey: '',
    };
  },
  watch: {
    menuSearchKey(val) {
      this.$emit('searchMenu', val);
    },
  },
};
</script>
<style lang="scss">
@import '@/styles/pos.scss';

.menu_listing {
  height: 100%;
  background-color: $white;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .search_area {
    height: 56px;
    display: grid;
    grid-template-columns: 50% 50%;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid $bg_color;
    background-color: $header;

    p {
      margin-left: 15px;
      font-size: 18px;
      color: $black-text;
    }

    .search {
      direction: rtl;
      display: inline-flex;
      padding-right: 10px;
      gap: 10px;

      .btn_create_order {
        border: 1px solid $white;
        background-color: $white;
        color: $blue;
        height: 35px;
        font-size: 12px;
        font-weight: inherit;
        text-transform: capitalize;
        direction: ltr;
        box-shadow: $elevation-default;
      }

      .search_field, .search_field:focus, .search_field:hover {
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

  .menu_items_list {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;

    .menu {
      display: grid;
      max-height: 100%;
      grid-template-columns: 25% 25% 25% 25%;
    }
  }
}
</style>
