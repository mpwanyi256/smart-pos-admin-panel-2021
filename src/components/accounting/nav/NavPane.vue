<template>
    <div class="nav">
        <div class="average_expense">
            <div class="today_expenses_title">
                Today's Expenses
                <v-spacer></v-spacer>
                <v-btn text small>
                    <v-icon>mdi-plus</v-icon>
                    Add Expense
                </v-btn>
            </div>
            <div class="expenses_list">
                <ExpenseItem v-for="i in 20" :key="i"/>
            </div>
        </div>
        <div class="accounts_navs">
            <div class="link">
                <v-icon>mdi-magnify</v-icon>
                Expense ledgers
            </div>
            <div class="link">
                <v-icon>mdi-magnify</v-icon>
                Expense ledgers
            </div>
        </div>
    </div>
</template>
<script>
import ExpenseItem from '@/components/accounting/generics/ExpenseItem.vue';

export default {
  name: 'AccountingNavPane',
  components: {
    ExpenseItem,
  },
};
</script>
<style scoped lang="scss">
@import '../../../styles/constants.scss';

    .nav {
        display: flex;
        flex-direction: column;
        gap: 5px;
        font-family: $font-style;
        font-size: 14px;
        width: 100%;

        .average_expense {
            font-weight: bold;
            color: $black;
            width: inherit;
            display: flex;
            flex-direction: column;
            max-height: 300px;
            min-height: 300px;
            border-bottom: 0.3px solid $border-color;

            .today_expenses_title {
                width: inherit;
                font-size: 14px;
                margin-top: 5px;
                border-bottom: 0.3px solid $border-color;
                height: 35px;
                display: flex;
                padding: 3px;
                // justify-content: center;
            }

            .expenses_list {
                height: 275px;
                width: inherit;
                overflow-y: auto;
            }
        }

        .accounts_navs {
            width: 100%;
            display: flex;
            flex-direction: column;
            // width: 100%;

            .link {
                display: inline-flex;
                flex-direction: row;
                width: 100%;
                border-bottom: 0.3px solid $light-grey;
                height: 36px;
                font-size: 14px;
                justify-content: left;
                justify-items: center;
            }
        }

    }
</style>
