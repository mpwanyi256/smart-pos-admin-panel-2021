<template>
    <div class="creditors">
        <div class="header">
            {{ `${ creditOrders.length } Credit Bills` }}
            <v-btn x-small class="float-right">
                View all
            </v-btn>
        </div>
        <div class="creditors-list">
            <div class="creditor-item">
                <div class="name">
                    Table
                </div>
                <div class="name">
                    Client
                </div>
                <div class="amount">
                    Total
                </div>
            </div>
            <div class="creditor-item" v-for="order in creditOrders" :key="order.order_id">
                <div class="name">
                    {{ order.table }}
                </div>
                <div class="name">
                    {{ order.client_name ? order.client_name : '' }}
                </div>
                <div class="amount">
                    {{ order.bill_sum_display }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CreditorsList',
  computed: {
    ...mapGetters('sales', ['orders']),
    creditOrders() {
      return this.orders.filter((order) => order.status === 4);
    },
  },
};
</script>
<style scoped lang="scss">
@import '../../styles/constants.scss';

    .creditors {
        height: 200px;
        background-color: $white;
        font-family: $font-style;
        font-size: 14px;
        line-height: 1.47059;
        display: flex;
        flex-direction: column;
        gap: 0;
        color: inherit;
        overflow: auto;

        .header {
            font-weight: 500;
            padding: 10px;
            background-color: $dark-grey;
            color: $white;
            text-align: left;
            font-weight: bold;
        }

        .creditors-list {
            height: 100%;
            width: 100%;
            overflow-y: auto!important;
            overflow-x: hidden;
            display: flex;
            flex-direction: column;

            .creditor-item:first-child, .creditor-item:first-child:hover {
                cursor: default;
                background-color: $light-grey;
                font-weight: bold;
            }

                .creditor-item {
                    max-height: 36px;
                    min-height: 36px;
                    font-size: 1em;
                    line-height: 1.5;
                    color: $black;
                    display: grid;
                    grid-template-columns: 50% 20% 30%;
                    overflow: hidden;
                    border: 0.5px solid $light-grey;

                    .name, .amount {
                        justify-items: center;
                    }
                    .amount {
                        text-align: right;
                        padding-right: 5px;
                    }
                }

                .creditor-item:hover {
                    background-color: $light-grey;
                    font-weight: 700;
                    cursor: pointer;
                }
        }

    }
</style>
