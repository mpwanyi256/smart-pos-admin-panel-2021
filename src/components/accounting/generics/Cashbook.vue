<template>
    <div class="cashbook_layout">
        <div class="cashbook_title text-center">
            <h3>Cashbook</h3>
            <p class="grey--text">for the month January 20221</p>
        </div>
        <div class="cashbook_dr_cr">
            <div class="cashbook_receipts">
                <CashbookLedger :entries="receipts" title="RECEIPTS" />
            </div>
            <div class="cashbook_payments">
                <CashbookLedger :entries="expenses" title="PAYMENTS" />
            </div>
        </div>
    </div>
</template>
<script>
import CashbookLedger from '@/components/accounting/generics/CashbookLedger.vue';

export default {
  name: 'Cashbook',
  components: {
    CashbookLedger,
  },
  data() {
    return {
      expenses: [
        {
          id: 1,
          date: 'July 1',
          description: 'Paid for stationeries',
          amount: 2000,
        },
        {
          id: 1,
          date: 'July 6',
          description: 'Paid for stationeries',
          amount: 2000,
        },
        // {
        //   id: 1,
        //   date: 'July 26',
        //   description: 'Paid for stationeries',
        //   amount: 2000,
        // },
        // {
        //   id: 1,
        //   date: 'July 8',
        //   description: 'Paid for stationeries',
        //   amount: 2000,
        // },
      ],
      receipts: [
        {
          id: 1,
          date: 'July 1',
          description: 'Sales',
          amount: 20000,
        },
        {
          id: 1,
          date: 'July 6',
          description: 'Sales',
          amount: 78900,
        },
        {
          id: 1,
          date: 'July 26',
          description: 'Sales',
          amount: 2000,
        },
        {
          id: 1,
          date: 'July 8',
          description: 'Sales',
          amount: 2000,
        },
      ],
    };
  },
};
</script>
<style scoped lang="scss">
@import '../../../styles/constants.scss';

    .cashbook_layout {
        width: 100%;
        height: auto;
        display: inline-flex;
        justify-content: center;
        background-color: $white;
        display: flex;
        flex-direction: column;
        border: 0.5px solid $border-color;
        box-shadow: $shadow;

        .cashbook_title {
            padding: 16px;
            border-bottom: 0.5px solid $border-color;
        }

        .cashbook_dr_cr {
            width: 100%;
            display: grid;
            grid-template-columns: 50% 50%;

            > div {
                // border-bottom: 0.5px solid $border-color;
            }
        }
    }
</style>
