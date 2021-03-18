<template>
    <div class="runnning_order">
        <div class="order_header">
            <h2>Order 3210</h2>
            <div class="date_and_time">
                <p>
                    15 Mar, 2020
                    <span>
                        <v-icon small class="clock_icon">mdi-clock</v-icon>
                    </span>
                    3:30 pm
                </p>
            </div>
        </div>
        <OrderListHeader />
        <div class="items_list">
            <div class="items">
                <OrderItem v-for="i in 20" :key="i" />
            </div>
        </div>
        <div class="order_sum_info">
            <OrderTotalCacular />
        </div>
    </div>
</template>
<script>
import OrderItem from '@/components/pos/order/OrderItem.vue';
import OrderListHeader from '@/components/pos/order/OrderListHeader.vue';
import OrderTotalCacular from '@/components/pos/order/OrderTotalCacular.vue';

export default {
  name: 'RunningOrder',
  components: {
    OrderItem,
    OrderListHeader,
    OrderTotalCacular,
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/pos.scss';

    .runnning_order {
        height: 100%;
        width: 100%;
        background-color: $white;
        display: flex;
        flex-direction: column;
        box-shadow: $elevation-default;
        color: $black;

        .order_header {
            height: 56px;
            background-color: $header;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding-left: 15px;
            padding-top: 10px;

            p .clock_icon {
                color: $black;
            }
        }

        .items_list {
            height: calc(100vh - 208px);
            overflow-y: auto;
            box-shadow: $elevation-default;

            .items {
                display: flex;
                flex-direction: column;
            }
        }

        .order_sum_info {
            height: 400px;
            display: flex;
            flex-direction: column;
            background-color: $header;
        }
    }
</style>
