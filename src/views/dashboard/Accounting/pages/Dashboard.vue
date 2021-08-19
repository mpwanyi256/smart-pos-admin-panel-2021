<template>
    <div class="dashboard">
        <SalesOverview />
        <AccountingOptions @open="openModal" />
        <Cashbook />
        <!-- Modals -->
          <ExpenseHeadsModal
            v-if="openExpenseModal"
            @close="openExpenseModal = false"
            @add="openCreateExpenseModal = true"
          />
          <CreateExpenseHeadModal
            v-if="openCreateExpenseModal"
            @close="openCreateExpenseModal = false"
            @reload="fetchExpenseHeads"
          />
          <LedgersModal
            v-if="showLedgersModal"
            @close="showLedgersModal = false"
          />
        <!-- Close modals -->
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import SalesOverview from '@/components/accounting/dashboard/SalesOverview.vue';
import AccountingOptions from '@/components/accounting/dashboard/AccountingOptions.vue';
import Cashbook from '@/components/accounting/generics/Cashbook.vue';
import ExpenseHeadsModal from '@/components/accounting/modals/ExpenseHeadsModal.vue';
import CreateExpenseHeadModal from '@/components/accounting/modals/CreateExpenseHeadModal.vue';
import LedgersModal from '@/components/accounting/modals/LedgersModal.vue';

export default {
  name: 'AccountsDashboard',
  components: {
    SalesOverview,
    AccountingOptions,
    Cashbook,
    ExpenseHeadsModal,
    CreateExpenseHeadModal,
    LedgersModal,
  },
  data() {
    return {
      openExpenseModal: false,
      openCreateExpenseModal: false,
      showLedgersModal: false,
    };
  },
  methods: {
    ...mapActions('accounts', ['GetExpenseHeads']),

    openModal(option) {
      if (option === 'expenseHeads') {
        this.openExpenseModal = true;
      } else if (option === 'ledgers') {
        this.showLedgersModal = true;
      }
    },
    fetchExpenseHeads() {
      this.GetExpenseHeads();
    },
  },
  created() {
    this.fetchExpenseHeads();
  },
};
</script>
<style scoped lang="scss">
    .dashboard {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
</style>
