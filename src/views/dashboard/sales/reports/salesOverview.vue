<template>
    <div class="sales_overview">
        <Settlements />
    </div>
</template>
<script>
import Settlements from '@/components/sales/settlements.vue';

export default {
  name: 'SalesOverview',
  components: {
    Settlements,
  },
};
</script>
<style scoped lang="scss">
@import '../../../../styles/constants.scss';

    .sales_overview {
        width: 100%;
        min-height: 100%;
        background-color: inherit;
        overflow-x: hidden;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>
