<template>
    <div class="sales_overview">
        <div class="sales text-center"
            @click="$emit('open', 'expenseHeads')"
        >
            <v-avatar size="50">
                <v-img contain src="@/assets/expense_heads.jpg" />
            </v-avatar>
            <p class="black--text">
                Expense heads
            </p>
        </div>
        <div class="expenses text-center"
            @click="$emit('open', 'ledgers')"
        >
            <v-avatar size="50">
                <v-img contain src="@/assets/expense_accounts.png" />
            </v-avatar>
            <p class="black--text">Ledgers</p>
        </div>
        <div class="expenses text-center"
            @click="$emit('open', 'cashbook')"
        >
            <v-avatar size="50">
                <v-img contain src="@/assets/cashbook.png" />
            </v-avatar>
            <p class="black--text">Cashbook</p>
        </div>
        <div class="expenses text-center"
            @click="$emit('open', 'findExpense')"
        >
            <v-avatar size="50">
                <v-img contain src="@/assets/find_expense.jpg" />
            </v-avatar>
            <p class="black--text">Find an expense</p>
        </div>
    </div>
</template>
<script>
export default {
  name: 'AccountingOptions',
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
            border-right: 0.3px solid $border-color;
            cursor: pointer;

            p {
                margin: auto;
            }
        }

        > div:hover {
            background-color: $light-grey;
        }
    }
</style>
