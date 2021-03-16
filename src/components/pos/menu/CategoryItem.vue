<template>
  <div class="category_item">
    <p>Category name fdhjfdjfd</p>
  </div>
</template>
<script>
export default {
  name: 'CategoryItem',
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
}

.category_item:hover {
  background-color: $bg_color;
}
</style>
