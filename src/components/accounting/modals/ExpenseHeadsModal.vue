<template>
    <Basemodal @close="$emit('close')" :title="'Expense Heads'" :size="800">
      <LinearLoader v-if="loading" />
      <BaseAlert v-if="error" :message="error" :alert="errorType" />
      <BaseTableComponent
          :add="true"
          :headers="heads"
          :data="expenseHeads"
          @add="$emit('add')"
          @view="viewItemDetails"
          @delete="dropExpenseHead"
      />
      <ConfirmModal
        @close="confirmAction = false"
        v-if="confirmAction && selectedItem"
        @yes="deleteExpenseHead"
      />
      <updateExpenseHeadModal
        @close="openUpdateModal = false"
        v-if="openUpdateModal && selectedItem"
        :expensehead="selectedItem"
      />
    </Basemodal>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Basemodal from '@/components/generics/Basemodal.vue';
import BaseTableComponent from '@/components/generics/BaseTableComponent.vue';
import LinearLoader from '@/components/generics/Loading.vue';
import BaseAlert from '@/components/generics/BaseAlert.vue';
import ConfirmModal from '@/components/generics/ConfirmModal.vue';
import updateExpenseHeadModal from '@/components/accounting/modals/updateExpenseHeadModal.vue';
import ErrorHandler from '@/mixins/ErrorHandler';

export default {
  name: 'ExpenseHeadsModal',
  components: {
    Basemodal,
    BaseTableComponent,
    BaseAlert,
    LinearLoader,
    ConfirmModal,
    updateExpenseHeadModal,
  },
  mixins: [ErrorHandler],
  data() {
    return {
      heads: [
        {
          text: 'Expense head', value: 'name', sortable: false, align: 'start',
        },
        {
          text: 'Description', value: 'description', sortable: false, align: 'start',
        },
        {
          text: '', value: 'action', sortable: false, align: 'start',
        },
        {
          text: '', value: 'delete', sortable: false, align: 'start',
        },
      ],
      loading: false,
      errorType: '',
      error: '',
      confirmAction: false,
      selectedItem: null,
      openUpdateModal: false,
    };
  },
  computed: {
    ...mapGetters('accounts', ['expenseHeads']),
  },
  methods: {
    ...mapActions('accounts', ['GetExpenseHeads', 'DeleteExpensehead']),
    viewItemDetails(exHead) {
      this.selectedItem = exHead.item;
      this.openUpdateModal = true;
    },
    dropExpenseHead(exHead) {
      this.selectedItem = exHead.item;
      this.confirmAction = true;
    },
    async deleteExpenseHead() {
      this.confirmAction = false;
      this.loading = true;
      const filters = {
        id: this.selectedItem.id,
      };
      const dropHead = await this.DeleteExpensehead(filters);
      if (dropHead.error) {
        this.errorType = 'warning';
        this.error = dropHead.message;
      } else {
        this.errorType = 'success';
        this.error = dropHead.message;
      }
      this.GetExpenseHeads();
      this.loading = false;
    },
  },
  created() {
    this.GetExpenseHeads();
  },
};
</script>
