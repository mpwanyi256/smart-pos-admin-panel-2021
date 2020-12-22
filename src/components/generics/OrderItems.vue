<template>
    <div class="order_items">
        <div class="item_row">
           <div class="item">Qty</div>
           <div class="item">Item name</div>
           <div class="item">Amount</div>
        </div>
        <div class="item_row" v-for="item in items" :key="item.id">
            <div class="item">{{ item.quantity }} </div>
            <div class="item text-left">{{ item.item_name }}</div>
            <div class="item">{{ item.amount }}</div>
        </div>
        <div class="item_row">
           <div class="item"></div>
           <div class="item">TOTAL</div>
           <div class="item"><strong>{{ total }}</strong></div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'OrderItems',
  props: {
    items: {
      type: Array,
      required: true,
    },
    total: {
      type: Object,
    },
  },
};
</script>
<style scoped lang="scss">
    .order_items {
        display: flex;
        flex-direction: column;
        min-height: 300px;
        max-height: 100%;
        overflow-y: auto;

        .item_row:first-child .item {
            font-weight: bold;
        }

        .item_row {
            max-width: 100%;
            height: auto;
            display: inline-flex;
            flex-direction: row;
            font-size: 14px;
            color: black;
            background-color: #3c3c3c;

            .item:first-child {
                width: 100px;
            }

            .item:last-child {
                width: 200px;
                justify-content: right;
                // font-weight: bold;
            }

            .item {
                display: inline-flex;
                align-items: center;
                justify-content: left;
                height: 36px;
                width: 100%;
                color: black;
                border: 0.2px solid #e2e2e2;
                background-color: white;
                // font-family: $font-style;
                padding: 10px;
            }
        }
    }
</style>
