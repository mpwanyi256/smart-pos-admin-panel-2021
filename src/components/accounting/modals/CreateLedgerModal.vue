<template>
    <Basemodal @close="$emit('close')" :title="'New Ledger'" :size="500">
        <v-form ref="frmExpenseHead" @submit.prevent="createNewLedger" class="pl-2 pr-2">
            <v-select
              outlined
              v-model.trim="expenseHead"
              :items="expenseHeads"
              item-text="name"
              item-value="id"
              label="Expense head"
            />
            <v-text-field
              outlined
              v-model.trim="ledger"
              label="Ledger account"
            />
            <BaseAlert v-if="error" :alert="alertType" :message="error" />
            <v-btn block dark class="black mt-3" type="submit">Save</v-btn>
            <LinearLoader v-if="Loading" class="mt-2" />
        </v-form>
    </Basemodal>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Basemodal from '@/components/generics/Basemodal.vue';
import BaseAlert from '@/components/generics/BaseAlert.vue';
import LinearLoader from '@/components/generics/Loading.vue';
import ErrorHandler from '@/mixins/ErrorHandler';

export default {
  name: 'CreateLedgerModal',
  mixins: [ErrorHandler],
  components: {
    Basemodal,
    BaseAlert,
    LinearLoader,
  },
  data() {
    return {
      ledger: '',
      expenseHead: null,
      error: '',
      alertType: 'warning',
      Loading: false,
    };
  },
  computed: {
    ...mapGetters('accounts', ['expenseHeads']),
  },
  methods: {
    ...mapActions('accounts', ['CreateLedger', 'GetLedgers']),

    async createNewLedger() {
      if (!this.expenseHead || this.expenseHead.length <= 0) {
        this.error = 'Please select expense head';
        this.alertType = 'warning';
      } else if (!this.ledger || this.ledger.length <= 2) {
        this.error = 'Ledger account name is required';
        this.alertType = 'warning';
      } else {
        this.Loading = true;
        const ledger = {
          expense_head: this.expenseHead,
          ledger: this.ledger.toUpperCase(),
        };
        const response = await this.CreateLedger(ledger);
        this.alertType = response.error ? 'warning' : 'success';
        this.error = response.message;
        await this.GetLedgers();
        this.Loading = false;
      }
    },
  },
};
</script>
