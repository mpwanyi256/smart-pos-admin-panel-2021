<template>
    <div class="selected_order">
        <RunningOrder class="running_order" />
    </div>
</template>
<script>
import RunningOrder from '@/components/pos/order/RunningOrder.vue';

export default {
  name: 'SelectedOrder',
  components: {
    RunningOrder,
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/pos.scss';

    .selected_order {
        height: calc(100% - 52px);
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: top;
        align-items: center;
        padding-left: 5px;
        padding-right: 5px;

        .running_order {
            width: 100%;
            height: 100%;
        }
    }

</style>
