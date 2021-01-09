<template>
    <Basemodal @close="$emit('close')" :title="'New cash expense'" :size="500">
        <v-form ref="frmCashExpense" @submit.prevent="createNewExpense">
            <div class="pa-2">
                <DatePickerBeta :message="`Expense Date`" @picked="setExpenseDate" />
                <v-select
                    outlined dense
                    v-model.trim="expenseHead"
                    :items="expenseHeads"
                    item-text="name"
                    item-value="id"
                    label="Expense head"
                />
                <v-select
                    outlined dense
                    v-model.trim="ledgerId"
                    :items="ledgerAccounts"
                    item-text="ledger"
                    item-value="id"
                    label="Ledger account"
                />
                <div class="split_entry">
                  <v-text-field class="entry"
                      outlined dense
                      v-model.trim="amount"
                      label="Amount"
                  />
                  <v-text-field class="entry"
                      outlined dense
                      v-model.trim="reference"
                      label="Reference"
                      hint="Not required. But can be used to reference a bill / invoice number."
                  />
                </div>
                <v-textarea
                    outlined dense clearable clear-icon="mdi-delete"
                    v-model.trim="details"
                    label="Details"
                />
            <BaseAlert v-if="error" :alert="alertType" :message="error" />
            <v-btn :disabled="!validForm" block type="submit">Save</v-btn>
            <LinearLoader v-if="loading" class="mt-2" />
            </div>
        </v-form>
    </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';
import DatePickerBeta from '@/components/generics/DatePickerBeta.vue';
import LinearLoader from '@/components/generics/Loading.vue';
import BaseAlert from '@/components/generics/BaseAlert.vue';
import { mapActions, mapGetters } from 'vuex';
import ErrorHandler from '@/mixins/ErrorHandler';

export default {
  name: 'CreateNewExpense',
  mixins: [ErrorHandler],
  components: {
    Basemodal,
    DatePickerBeta,
    LinearLoader,
    BaseAlert,
  },
  data() {
    return {
      expenseHead: '',
      details: '',
      ledgerId: '',
      ledgerAccounts: [],
      expenseDate: '',
      amount: '',
      reference: '',
      loading: false,
      alertType: '',
      error: '',
    };
  },
  computed: {
    ...mapGetters('accounts', ['expenseHeads', 'allLedgers']),
    ...mapGetters('auth', ['user']),

    validForm() {
      if ((this.expenseHead && this.expenseHead.length > 0)
      && (this.ledgerId && this.ledgerId.length > 0)
      && (this.details && this.details.length > 3)
      && (this.expenseDate && this.expenseDate.length > 3)
      && (this.amount && parseInt(this.amount, 10) > 0)) {
        return true;
      }
      return false;
    },
  },
  watch: {
    expenseHead(val) {
      this.ledgerAccounts = this.allLedgers
        .filter((ledger) => ledger.expense_head_id === val);
    },
  },

  methods: {
    ...mapActions('accounts', ['GetLedgers', 'AddCashExpense']),

    setExpenseDate(datePicked) {
      this.expenseDate = datePicked;
    },

    async createNewExpense() {
      this.loading = true;

      const filters = {
        expense_date: this.expenseDate,
        expense_head: this.expenseHead,
        ledger_id: this.ledgerId,
        amount: parseFloat(this.amount),
        reference: this.reference ? this.reference : '',
        remarks: this.details.toUpperCase(),
        added_by: this.user.id,
      };

      const response = await this.AddCashExpense(filters);
      this.alertType = response.error ? 'warning' : 'success';
      this.error = response.message;
      if (!response.error) this.$refs.frmCashExpense.reset();
      this.loading = false;
    },
  },
  created() {
    this.GetLedgers();
  },
};
</script>
<style scoped lang="scss">
  .split_entry {
    width: 100%;
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;

    .entry {
      width: 100%;
    }
  }
</style>
