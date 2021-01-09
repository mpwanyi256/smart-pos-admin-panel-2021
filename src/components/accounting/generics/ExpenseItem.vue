<template>
    <div class="expense_item">
        <div class="exp_title">
            Fruits & vegtables
            <v-spacer></v-spacer>
            30,000
        </div>
        <div class="exp_description">
            Bought fruits for kitchen to use for the buffet
        </div>
    </div>
</template>
<script>
export default {
  name: 'ExpenseItem',
};
</script>
<style scoped lang="scss">
@import '../../../styles/constants.scss';

    .expense_item:hover {
        cursor: pointer;
        background-color: $light-grey;
    }

    .expense_item {
        height: auto;
        font-size: small;
        display: flex;
        flex-direction: column;
        border-bottom: 0.3px solid $light-grey;
        padding: 5px;

        .exp_title {
            font-weight: bold;
            width: inherit;
            display: flex;
        }
        .exp_description {
            font-weight: 200;
            font-style: italic;
            color: $dark-grey;
        }
    }

</style>
