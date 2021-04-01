<template>
    <div class="direct_settle">
        <div class="option">
            <h2>Bill: {{ billTotal }}</h2>
            <v-select outlined class="settle_options"
                v-model="settlementId"
                :items="options"
                item-text="name"
                item-value="id"
            />
            <v-btn block class="btn_settle" :disabled="!settlementId">
                Settle Bill
            </v-btn>
        </div>
    </div>
</template>
<script>

export default {
  name: 'DirectSettlement',
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      options: [
        { name: 'CASH', id: 1 },
        { name: 'VISA', id: 2 },
        { name: 'MOBILE MONEY', id: 3 },
      ],
      settlementId: null,
    };
  },
  computed: {
    billTotal() {
      return this.order.final_amount;
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

    .direct_settle {
        display: inline-flex;
        flex-direction: column;
        width: 100%;

        > div {
            height: 300px;
            width: 100%;
            display: inline-flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
            padding: 10px;

            .settle_options {
                width: 300px;
            }

            .btn_settle {
                background-color: $blue !important;
                color: $white;
                height: 10px;
                width: 100%;
            }
        }
    }
</style>
