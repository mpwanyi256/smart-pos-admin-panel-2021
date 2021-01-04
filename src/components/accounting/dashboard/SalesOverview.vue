<template>
    <div class="sales_overview">
        <div class="sales">
            <h1>{{ totalSale }}</h1>
            <p class="grey--text">Total sale</p>
        </div>
        <div class="expenses">
            <h1>5,000</h1>
            <p class="grey--text">Total expense</p>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SalesOverview',
  computed: {
    ...mapGetters('sales', ['sale']),

    totalSale() {
      return this.sale.total_sale ? this.sale.total_sale : '0';
    },
  },
};
</script>
<style scoped lang="scss">
@import '../../../styles/constants.scss';

    .sales_overview {
        width: 100%;
        height: auto;
        display: inline-flex;
        justify-content: center;
        background-color: $white;

        > div {
            width: 100%;
            padding: 16px;
        }

        > div:first-child {
            border-right: 0.3px solid $border-color;
        }

        > div:last-child {
            border-left: 0.3px solid $border-color;
        }
    }
</style>
