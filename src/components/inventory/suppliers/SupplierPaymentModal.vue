<template>
  <Basemodal
    :title="`${selectedSupplier ? selectedSupplier.name.toLowerCase() : 'Supplier'} payment`"
    :size="800" @close="$emit('close')">
    <div class="supplier_payment">
        <div class="supplier_chooser">
            <div class="search_area">
                <BaseTextfield v-model="search" placeholder="Search for a supplier" />
            </div>
            <div class="suppliers_list">
                <div>
                    <Supplier
                    v-for="supplier in filteredSuppliers"
                    :key="supplier.id"
                    :supplier="supplier"
                    :is-selected="selectedSupplier ? supplier.id == selectedSupplier.id : false"
                    @pick="selectedSupplier = $event"
                />
                </div>
            </div>
            <div class="payment_details" v-show="selectedSupplier">
                <div>
                    <label>Amount Paid</label>
                    <BaseTextfield v-model="amount" inputType="number" placeholder="Amount paid" />
                </div>
                <div>
                    <label>Date of payment</label>
                    <DatePickerBeta
                      message="Payment date"
                      @picked="paymentDate = $event"
                      :max="dateToday"
                    />
                </div>
                <div>
                    <label>Payment mode</label>
                    <v-select outlined class="settle_options"
                        v-model="paymentMode" dense
                        :items="allowedPaymentModes"
                        item-text="name"
                        item-value="id"
                    />
                </div>
                <div>
                    <label>Payment reference</label>
                    <BaseTextfield v-model="reference" placeholder="payment reference" />
                </div>
                <div>
                    <label>Remarks</label>
                    <BaseTextfield v-model="remarks" placeholder="Remarks" />
                </div>
                <div>
                    <label v-show="error" class="red--text">{{ error }}</label>
                    <v-spacer></v-spacer>
                    <div>
                        <v-btn @click="savePayment" :disabled="!isValidEntry"
                              class="float-right btn_save_payment">Save</v-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </Basemodal>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import Basemodal from '@/components/generics/Basemodal.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import Supplier from '@/components/inventory/suppliers/Supplier.vue';
import DatePickerBeta from '@/components/generics/DatePickerBeta.vue';

export default {
  name: 'SupplierPaymentModal',

  props: {
    companyId: {
      type: [Number, String],
      required: true,
    },
  },

  components: {
    Basemodal,
    BaseTextfield,
    Supplier,
    DatePickerBeta,
  },

  data() {
    return {
      loading: false,
      suppliers: [],
      search: '',
      selectedSupplier: null,
      amount: '',
      paymentDate: '',
      paymentMode: 1,
      reference: '',
      remarks: '',
      allowedPaymentOptions: [
        1, 10, 11, 12,
      ],
      error: '',
    };
  },

  computed: {
    ...mapState('pos', ['paymentSettlements']),
    ...mapGetters('auth', ['user']),

    isValidEntry() {
      return !!(this.selectedSupplier && parseInt(this.amount, 10) > 0
        && this.paymentMode);
    },

    allowedPaymentModes() {
      return this.paymentSettlements.filter((Settlement) => this.allowedPaymentOptions
        .includes(Settlement.id));
    },

    dateToday() {
      return new Date().toISOString();
    },

    filteredSuppliers() {
      return this.suppliers.filter((supplier) => supplier.name.toLowerCase()
        .match(this.search.toLowerCase()));
    },
  },

  watch: {
    paymentMode() {
      this.checkPaymentReference();
    },

    reference() {
      this.checkPaymentReference();
    },
  },

  async created() {
    await this.fetchSuppliers();
    await this.fetchsetpaymentSettlements();
  },

  methods: {
    ...mapActions('inventory', ['updateItem']),
    ...mapActions('pos', ['fetchsetpaymentSettlements']),

    checkPaymentReference() {
      if (this.paymentMode !== 1 && !this.reference) {
        this.error = 'Please enter a pyment reference';
      } else {
        this.error = '';
      }
    },

    async fetchSuppliers(searchFilter) {
      this.loading = true;
      const Suppliers = await this.updateItem({
        get_suppliers: searchFilter || 'all',
        company_id: this.companyId,
      });
      if (!Suppliers.error) this.suppliers = Suppliers.data;
      this.loading = false;
    },

    async savePayment() {
      const payment = {
        add_supplier_payment: true,
        supplier_id: this.selectedSupplier.id,
        amount: this.amount,
        payment_date: this.paymentDate,
        payment_mode: this.paymentMode,
        reference: this.reference.toUpperCase(),
        remarks: this.remarks.toUpperCase(),
        added_by: this.user.id,
      };
      const addPayment = await this.updateItem(payment);
      if (!addPayment.error) this.$emit('close');
      else this.error = addPayment.message;
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

  .supplier_payment {
      max-height: 70vh;
      overflow-y: auto;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      gap: 10px;

      .supplier_chooser {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
          padding: 8px 4px;

          .suppliers_list {
              display: flex;
              flex-direction: column;
              max-height: 150px;
              overflow-y: auto;
              overflow-x: hidden;
          }

          .payment_details {
              display: grid;
              grid-template-columns: 49% 49%;
              padding: 8px 4px;
              column-gap: 15px;

              > div {
                  display: flex;
                  flex-direction: column;
                  gap: 10px;
                  margin-bottom: 10px;
              }
          }
      }
  }

  .btn_save_payment {
    background-color: $accent !important;
    color: $white;
  }
</style>
