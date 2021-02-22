<template>
    <div class="menu_item">
        <div class="item_name">
            ITEM NAME
        </div>
        <div class="item_price">
            CATEGORY
        </div>
        <div class="item_price">
            PRICE
        </div>
        <div class="item_action" />
    </div>
</template>
<script>
export default {
  name: 'MenuItemsDisplayHeader',
};
</script>
<style scoped lang="scss">
@import '../../styles/constants.scss';

    .menu_item {
        height: 50px;
        background-color: inherit;
        border: 0.5px solid $light-grey;
        display: grid;
        grid-template-columns: 50% 20% 20% 10%;
        justify-content: left;
        align-items: center;
        padding-left: 15px;
        color: $black;
        size: 16px;
        font-weight: bold;

        .item_name, .item_price {
            padding-right: 15px;
            max-lines: 1;
            line-height: 1.5;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 100%;
            height: 1.2em;
            white-space: nowrap;
            text-align: left;
        }

        .item_action {
            display: inline-flex;
            justify-content: center;
        }
    }

</style>
