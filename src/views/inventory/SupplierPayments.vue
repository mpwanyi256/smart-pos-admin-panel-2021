<template>
    <PageTemplate title="Supplier payments">
        <template slot="header-actions">
          <v-select dense outlined
            :items="suppliers"
            item-text="name"
            item-value="id"
            v-model="supplierId"
            label="Supplier"
          />
          <DatePickerBeta
            message="From"
            @picked="dateFrom = $event"
            :max="dateToday"
          />
          <DatePickerBeta
            message="To"
            @picked="dateTo = $event"
            :max="dateToday"
          />
          <BaseTextfield v-model="search" placeholder="Search" />
          <v-btn fab small @click="openPaymentModal = true">
              <v-icon>mdi-plus</v-icon>
          </v-btn>
      </template>
      <template slot="body">
        <LinearLoader v-if="loading" />
        <Table>
          <template slot="header">
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Supplier</th>
              <th>Amount</th>
              <th>Payment Mode</th>
              <th>Reference</th>
              <th>Added By</th>
              <th>Remarks</th>
              <th>&nbsp;</th>
            </tr>
          </template>
          <template slot="body">
            <tr v-for="(payment, i) in filteredPayments" :key="`payment-${payment.id}`">
                <td>{{ ++i }}</td>
                <td>{{ payment.payment_date }}</td>
                <td>{{ payment.supplier }}</td>
                <td>{{ payment.amount }}</td>
                <td>{{ payment.payment_mode }}</td>
                <td>{{ payment.payment_ref }}</td>
                <td>{{ payment.added_by }}</td>
                <td>
                    <div class="remarks">
                        <p>{{ payment.remarks }}</p>
                    </div>
                </td>
                <td>
                    <v-btn class="red--text darken-3" small icon @click="dropPayment(payment)">
                    <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </td>
            </tr>
          </template>
        </Table>
        <SupplierPaymentModal
          v-if="openPaymentModal"
          @close="openPaymentModal = false"
          :company-id="companyId"
        />
        <ConfirmModal
          v-if="openConfirmModal"
          title="Are you sure you want to delete payment?"
          @close="openConfirmModal = false"
          @yes="deletePayment"
        />
      </template>
    </PageTemplate>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import PageTemplate from '@/views/estates/PageTemplate.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import Table from '@/components/generics/new/Table.vue';
import LinearLoader from '@/components/generics/Loading.vue';
import DatePickerBeta from '@/components/generics/DatePickerBeta.vue';
import SupplierPaymentModal from '@/components/inventory/suppliers/SupplierPaymentModal.vue';
import ConfirmModal from '@/components/generics/ConfirmModal.vue';

export default {
  name: 'SupplierPayments',
  components: {
    PageTemplate,
    BaseTextfield,
    Table,
    SupplierPaymentModal,
    DatePickerBeta,
    LinearLoader,
    ConfirmModal,
  },
  data() {
    return {
      payments: [],
      openPaymentModal: false,
      search: '',
      loading: false,
      dateFrom: '',
      dateTo: '',
      suppliers: [],
      supplierId: '0',
      selectedPayment: null,
      openConfirmModal: false,
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),

    filteredPayments() {
      return this.payments.filter((Pay) => Pay.supplier.toLowerCase()
        .match(this.search.toLowerCase())
        || Pay.amount_show.toLowerCase().match(this.search.toLowerCase())
        || Pay.payment_mode.toLowerCase().match(this.search.toLowerCase())
        || Pay.payment_ref.toLowerCase().match(this.search.toLowerCase())
        || Pay.added_by.toLowerCase().match(this.search.toLowerCase())
        || Pay.remarks.toLowerCase().match(this.search.toLowerCase()));
    },

    dateToday() {
      return new Date().toISOString();
    },

    companyId() {
      return this.user ? this.user.company_id : null;
    },
  },
  watch: {
    async openPaymentModal(val) {
      if (!val) {
        await this.fetchPayments();
      }
    },

    async dateFrom() {
      await this.fetchPayments();
    },

    async dateTo() {
      await this.fetchPayments();
    },
    async supplierId() {
      await this.fetchPayments();
    },
  },
  async created() {
    this.$nextTick(async () => {
      await this.fetchPayments();
      await this.fetchSuppliers();
    });
  },
  methods: {
    ...mapActions('inventory', ['updateItem']),

    dropPayment(payment) {
      this.selectedPayment = payment;
      this.openConfirmModal = true;
    },

    async deletePayment() {
      this.openConfirmModal = false;
      await this.updateItem({ drop_payment_record: this.selectedPayment.id });
      await this.fetchPayments();
    },

    async fetchPayments() {
      this.loading = true;
      const params = {
        fetch_supplier_payments: 'all',
        date_from: this.dateFrom,
        date_to: this.dateTo,
        supplier_id: this.supplierId,
      };
      const PAYMENTS = await this.updateItem(params);
      if (PAYMENTS.data) this.payments = PAYMENTS.data;
      this.loading = false;
    },

    async fetchSuppliers(searchFilter) {
      this.loading = true;
      const Suppliers = await this.updateItem({
        get_suppliers: searchFilter || 'all',
      });
      if (!Suppliers.error) {
        this.suppliers = [
          { id: 0, name: 'All' },
          ...Suppliers.data,
        ];
      }
      this.loading = false;
    },
  },
};
</script>
<style lang="scss" scoped>
    .remarks {
        max-width: 150px;
         p {
            margin: auto;
            font-size: 14px;
            max-lines: 2;
            line-height: 1.5;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 100%;
            text-align: left;
            text-transform: uppercase;
         }
    }
</style>
