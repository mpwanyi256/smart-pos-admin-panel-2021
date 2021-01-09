<template>
    <div class="cashbook_layout">
        <div class="ledger_title text-center">
            <h3>{{ title }}</h3>
        </div>
        <div class="ledger_headers">
            <div class="ledger_title">DATE</div>
            <div class="ledger_title description">DESCRIPTION</div>
            <div class="ledger_title">REF</div>
            <div class="ledger_title">AMOUNT</div>
        </div>
        <div class="ledger_entries">
            <div class="entry" v-for="(expense, i) in entries" :key="i">
                <div class="ledger_title">{{ expense.date }}</div>
                <div class="ledger_title description">{{ expense.description }}</div>
                <div class="ledger_title">REF</div>
                <div class="ledger_title">{{ expense.amount }}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'CashbookLedger',
  props: {
    title: {
      type: String,
      required: true,
    },
    entries: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style scoped lang="scss">
@import '../../../styles/constants.scss';

    .cashbook_layout {
        width: 100%;
        display: flex;
        flex-direction: column;
        color: $black;

        .ledger_title {
            padding: 8px;
            h3 {
              font-size: 14px;
            }
        }

        .ledger_headers {
            display: grid;
            grid-template-columns: 20% 50% 10% 20%;
            width: 100%;

            .ledger_title {
                font-size: 12px;
                font-weight: bold;
            }

            > div {
                width: 100%;
                border: 0.5px solid $border-color;
            }
        }

        .ledger_entries {
            width: 100%;
            min-height: 300px;
            overflow-y: auto;
            overflow-x: hidden;
            color: $grey;

            > div {
                width: 100%;
                height: 36px;
                overflow: hidden;
                display: grid;
                grid-template-columns: 20% 50% 10% 20%;

                > div {
                    width: 100%;
                    border: 0.5px solid $border-color;
                    font-size: small;
                }
            }
        }

    }

</style>
