<template>
    <div class="sales-overview">
        <div class="settled-orders"
            v-for="(item, i) in data"
            :key="i"
        >
            <div class="display">
                <p>{{ item.name }}</p>
                <span>{{ item.amount }}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'PaymentSettlements',
  props: {
    data: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

    .sales-overview {
        width: 100%;
        height: auto;
        display: inline-flex;
        flex-direction: row;
        gap: 1px;
        overflow-y: auto;
        font-family: $font-style;

        .settled-orders {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            color: black;
            background-color: white;
            padding: 10px;

            p {
                font-size: 12px !important;
                font-weight: bold;
            }

            .display {
                display: flex;
                flex-direction: column;
                text-align: center;
            }
        }
    }
</style>
