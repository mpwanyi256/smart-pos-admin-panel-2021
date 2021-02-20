<template>
    <div class="menu_item">
        <div class="item_name">
            {{ menuItem.name }}
        </div>
        <div class="item_price">
            {{ menuItem.price }}
        </div>
        <div class="item_action">
            <v-btn icon small><v-icon>mdi-pencil</v-icon></v-btn>
            <v-btn small color="orange" dark><v-icon left>mdi-plus</v-icon>Recipe</v-btn>
            <v-btn icon small color="red darken-3" dark><v-icon>mdi-delete</v-icon></v-btn>
        </div>
    </div>
</template>
<script>

export default {
  name: 'MenuItem',
  props: {
    menuItem: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style scoped lang="scss">
@import '../../styles/constants.scss';

    .menu_item {
        height: 50px;
        background-color: $white;
        border: 0.5px solid $light-grey;
        display: grid;
        grid-template-columns: 50% 10% 40%;
        justify-content: left;
        align-items: center;
        text-align: left;
        padding-left: 15px;
        color: $black-text;
        size: 14px;

        .item_name {
            padding-right: 15px;
            max-lines: 1;
            line-height: 1.5;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 100%;
            white-space: nowrap;
        }

        .item_action {
            display: inline-flex;
            justify-content: right;
            gap: 5px;
        }
    }

    .menu_item:hover {
        border: 1px solid $border-color;
        cursor: pointer;
        color: $black;
    }

</style>
