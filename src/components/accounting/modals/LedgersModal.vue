<template>
    <Basemodal @close="$emit('close')" :title="'Ledgers'" :size="800">
        <LinearLoader v-if="loading" />
        <BaseTableComponent
          :add="true"
          :headers="heads"
          :data="allLedgers"
          @add="createLedger = true"
          @delete="dropLedger"
          @view="updateLedger"
        />
        <CreateLedgerModal
          v-if="createLedger"
          @close="createLedger = false"
        />
        <ConfirmModal
          @close="confirmAction = false"
          v-if="confirmAction && selectedLedger"
          @yes="deleteLedgerAccount"
        />
        <UpdateLedgerModal
          @close="openUpdateModal = false"
          v-if="openUpdateModal && selectedLedger"
          :ledger="selectedLedger"
          @updated="reloadUpdate"
        />
    </Basemodal>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Basemodal from '@/components/generics/Basemodal.vue';
import LinearLoader from '@/components/generics/Loading.vue';
import BaseTableComponent from '@/components/generics/BaseTableComponent.vue';
import CreateLedgerModal from '@/components/accounting/modals/CreateLedgerModal.vue';
import UpdateLedgerModal from '@/components/accounting/modals/UpdateLedgerModal.vue';
import ConfirmModal from '@/components/generics/ConfirmModal.vue';
import ErrorHandler from '@/mixins/ErrorHandler';

export default {
  name: 'LedgersModal',
  components: {
    Basemodal,
    LinearLoader,
    BaseTableComponent,
    CreateLedgerModal,
    ConfirmModal,
    UpdateLedgerModal,
  },
  mixins: [ErrorHandler],
  data() {
    return {
      createLedger: false,
      heads: [
        {
          text: 'Ledger', value: 'ledger', sortable: false, align: 'start',
        },
        {
          text: 'Expense head', value: 'expense_head', sortable: false, align: 'start',
        },
        {
          text: '', value: 'action', sortable: false, align: 'start',
        },
        {
          text: '', value: 'delete', sortable: false, align: 'start',
        },
      ],
      loading: false,
      selectedLedger: null,
      confirmAction: false,
      openUpdateModal: false,
    };
  },
  computed: {
    ...mapGetters('accounts', ['allLedgers']),
  },
  methods: {
    ...mapActions('accounts', ['GetLedgers', 'DeleteLedgerAccount']),

    reloadUpdate() {
      this.openUpdateModal = false;
      this.GetLedgers();
    },

    dropLedger(ledger) {
      this.selectedLedger = ledger.item;
      this.confirmAction = true;
    },
    updateLedger(ledger) {
      this.selectedLedger = ledger.item;
      this.openUpdateModal = true;
    },
    async deleteLedgerAccount() {
      this.confirmAction = false;
      this.loading = true;
      const filter = {
        ledger_id: this.selectedLedger.id,
      };
      const drop = await this.DeleteLedgerAccount(filter);
      if (drop.error) {
        this.errorType = 'warning';
        this.error = drop.message;
      } else {
        this.errorType = 'success';
        this.error = drop.message;
      }
      this.GetLedgers();
      this.loading = false;
    },
  },
  created() {
    this.GetLedgers();
  },
};
</script>
