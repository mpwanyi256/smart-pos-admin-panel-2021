<template>
    <Basemodal @close="$emit('close')" :title="'Update ledger'" :size="500">
      <v-form @submit.prevent="updateLedger">
        <div class="ma-2">
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
            v-model.trim="ledgerName"
            label="Ledger account"
          />
        </div>
        <BaseAlert v-if="error" :alert="alertType" :message="error" />
        <v-btn block dark class="black mt-3" type="submit">Save update</v-btn>
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
  name: 'UpdateLedgerModal',
  mixins: [ErrorHandler],
  components: {
    Basemodal,
    BaseAlert,
    LinearLoader,
  },
  props: {
    ledger: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      expenseHead: null,
      ledgerName: '',
      error: '',
      alertType: 'warning',
      Loading: false,
    };
  },
  computed: {
    ...mapGetters('accounts', ['expenseHeads']),
  },
  methods: {
    ...mapActions('accounts', ['UpdateLedgerAccount']),

    async updateLedger() {
      if (!this.expenseHead || this.expenseHead.length <= 0) {
        this.error = 'Please select expense head';
        this.alertType = 'warning';
      } else if (!this.ledgerName || this.ledgerName.length <= 2) {
        this.error = 'Ledger account name is required';
        this.alertType = 'warning';
      } else {
        this.Loading = true;
        const ledger = {
          ledger_id: this.ledger.id,
          expense_head: this.expenseHead,
          ledger: this.ledgerName.toUpperCase(),
        };
        const response = await this.UpdateLedgerAccount(ledger);
        this.alertType = response.error ? 'warning' : 'success';
        this.error = response.message;
        this.Loading = false;
        if (!response.error) this.$emit('updated');
      }
    },
  },
  created() {
    this.expenseHead = this.ledger.expense_head_id;
    this.ledgerName = this.ledger.ledger;
  },
};
</script>
