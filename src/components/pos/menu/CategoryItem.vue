<template>
  <div class="category_item" @click="$emit('filter', category.id)">
    <p v-html="category.name"></p>
  </div>
</template>
<script>
export default {
  name: 'CategoryItem',
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss">
@import '@/styles/pos.scss';

.category_item {
  height: 50px;
  width: 100%;
  display: flex;
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
    text-align: center;
    text-transform: uppercase;
  }
}

.category_item:hover {
  background-color: $bg_color;
}
</style>
