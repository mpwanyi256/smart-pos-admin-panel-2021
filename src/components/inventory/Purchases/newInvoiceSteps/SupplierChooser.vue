<template>
    <div class="supplier_chooser">
        <div class="inv_number">
            <p>Enter invoice No.</p>
            <BaseTextfield :disabled="disableAlter"
              v-model.trim="invNumber" placeholder="inv No." />
        </div>
        <div class="inv_date">
            <p>Inv date</p>
            <DatePickerBeta :disabled="disableAlter" message=""
            @picked="invoiceDate = $event" />
        </div>
        <div class="inv_supplier">
            <p>Supplier</p>
            <v-select
                v-model="supplierId"
                :disabled="disableSupplierSelector || disableAlter"
                outlined
                dense
                :items="suppliers"
                item-text="name"
                item-value="id"
            />
        </div>
        <div class="create_invoice">
          <p>&nbsp;</p>
          <v-btn small v-if="!disableAlter"
            @click="fetchMappings"
            :disabled="disableSupplierSelector">
            Add Items
          </v-btn>
          <v-btn small v-else
            @click="$emit('saveInvoice')"
            class="green" dark>
            Save Invoice
          </v-btn>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import DatePickerBeta from '@/components/generics/DatePickerBeta.vue';

export default {
  name: 'SupplierChooser',
  props: {
    suppliers: {
      type: Array,
      required: true,
    },
  },
  components: {
    BaseTextfield,
    DatePickerBeta,
  },
  data() {
    return {
      invNumber: '',
      invoiceDate: '',
      supplierId: '',
      disabled: true,
      error: '',
      disableAlter: false,
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),
    disableSupplierSelector() {
      return (this.invNumber.length < 1) && (this.supplierId.length > 0);
    },
  },
  watch: {
    disableSupplierSelector(val) {
      this.disabled = val;
    },
    // invNumber(val) {
    //   if (!this.disableSupplierSelector && this.supplierId) {
    //     this.$emit('getMappings', {
    //       supplier_id: this.supplierId,
    //       invoice_numver: val.toUpperCase(),
    //       invoice_date: this.invoiceDate,
    //     });
    //   }
    // },
    // invoiceDate(val) {
    //   if (!this.disableSupplierSelector && this.supplierId) {
    //     this.$emit('getMappings', {
    //       supplier_id: this.supplierId,
    //       invoice_numver: this.invNumber.toUpperCase(),
    //       invoice_date: val,
    //     });
    //   }
    // },

    // disableSupplierSelector(val) {
    //   if (val) this.supplierId = '';
    // },

    // supplierId(val) {
    //   if (val.trim().length > 0) {
    //     this.$emit('getMappings', {
    //       supplier_id: val,
    //       invoice_numver: this.invNumber.toUpperCase(),
    //       invoice_date: this.invoiceDate,
    //     });
    //   } else {
    //     this.$emit('reset');
    //   }
    // },
  },
  methods: {
    ...mapActions('inventory', ['updateItem']),

    disableInvoiceAlter() {
      this.disableAlter = true;
    },

    async fetchMappings() {
      const newInvoice = {
        supplier_id: this.supplierId,
        invoice_number: this.invNumber.toUpperCase(),
        invoice_date: this.invoiceDate,
      };

      const createInvoice = await this.updateItem({
        create_new_invoice: true,
        added_by: this.user.id,
        company_id: this.user.company_id,
        ...newInvoice,
      });
      console.log('Invoice', createInvoice);
      if (!createInvoice.error) {
        this.$emit('getMappings', {
          invoice_id: createInvoice.invoice_id,
          ...newInvoice,
        });
        this.disabled = true;
      } else {
        this.error = createInvoice.message;
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.supplier_chooser {
    height: 100px;
    width: 100%;
    display: flex;
    flex-direction: row;
    color: $black;
    border-bottom: 1px solid $border-color;

    .create_invoice {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    >div {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-items: center;
        margin: 10px;
    }
}

</style>
