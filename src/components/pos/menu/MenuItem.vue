<template>
  <div class="category_item" @click="$emit('addItem', item)">
    <p v-html="item.name"></p>
    <p class="item_price" v-html="item.price_display"></p>
  </div>
</template>
<script>
export default {
  name: 'MenuItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss">
@import '@/styles/pos.scss';

.category_item {
  height: 55px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid $bg_color;
  overflow: hidden;
  cursor: pointer;
  color: $black-text;

  p {
    margin: auto;
    padding-right: 5px;
    padding-left: 5px;
    max-lines: 2;
    line-height: 1.5;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    white-space: nowrap;
    text-align: left;
  }

  .item_price {
    text-align: right;
    font-weight: bold;
    justify-content: baseline;
    // color: $blue;
  }
}

.category_item:hover {
  background-color: $bg_color;
}
</style>
