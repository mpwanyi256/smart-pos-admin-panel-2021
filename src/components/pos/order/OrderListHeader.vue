<template>
    <div class="order_item">
        <div class="item_name">
            Item name
        </div>
        <div class="item_price">Amount</div>
        <div class="item_actions">
            &nbsp;
        </div>
    </div>
</template>
<script>
export default {
  name: 'OrderListHeader',
};
</script>
<style scoped lang="scss">
@import '@/styles/pos.scss';

    .order_item {
        height: 50px;
        width: inherit;
        background-color: $white;
        border: 1px solid $header;
        display: grid;
        grid-template-columns: 70% 20% 10%;
        font-size: 14px;
        color: $black;
        font-weight: bold;

        .item_name {
            display: flex;
            flex-direction: row;
            justify-content: left;
            padding-left: 10px;
            line-height: 1.5;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 100%;
            white-space: nowrap;
            padding-right: 5px;
        }

        .item_price {
            justify-content: center;
            text-align: center;
        }

        .item_name, .item_actions, .item_price {
            display: flex;
            align-items: center;
        }

        .item_actions {
            direction: rtl;
        }
    }
</style>
