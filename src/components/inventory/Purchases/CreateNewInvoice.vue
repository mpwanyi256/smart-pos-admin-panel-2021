<template>
  <Basemodal :title="'Create new invoice'" :size="1200" @close="$emit('close')">
    <div class="new_purchase">
            <SupplierChooser
              ref="SupplierChooser"
              :suppliers="suppliers"
              @getMappings="fetchSupplierMappings"
              @reset="resetForm"
              @saveInvoice="$emit('close')"
            />
            <template>
                <InvoiceItemSelector
                    :mappings="mappings"
                    @add="addItemToInvoice"
                />
                <div v-if="addItems" class="added_items">
                    <Table>
                        <template slot="header">
                          <tr v-if="errorMessage">
                            <td colspan="7">
                              <BaseAlert :type="Alerttype" :message="errorMessage" />
                            </td>
                          </tr>
                            <tr>
                                <th>Item name</th>
                                <th>Pack size</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Unit price</th>
                                <th>Amount</th>
                                <th>&nbsp;</th>
                            </tr>
                        </template>
                        <template slot="body">
                          <tr v-for="(item, i) in invoiceItems" :key="i">
                              <td>{{ item.name }}</td>
                              <td>{{ item.pack_size }}</td>
                              <td>{{ item.packs_received }}</td>
                              <td>{{ item.quantity }}</td>
                              <td>{{ item.unit_price }}</td>
                              <td>{{ item.item_cost }}</td>
                              <td>
                                <v-btn
                                  small
                                  icon
                                  class="red--text darken--3"
                                  @click="dropInvItem(item.id)">
                                  <v-icon>mdi-delete</v-icon>
                                </v-btn>
                              </td>
                          </tr>
                        </template>
                    </Table>
                </div>
            </template>
    </div>
  </Basemodal>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Basemodal from '@/components/generics/Basemodal.vue';
import SupplierChooser from '@/components/inventory/Purchases/newInvoiceSteps/SupplierChooser.vue';
import InvoiceItemSelector from '@/components/inventory/Purchases/newInvoiceSteps/InvoiceItemSelector.vue';
import BaseAlert from '@/components/generics/new/BaseAlert.vue';
import Table from '@/components/generics/new/Table.vue';

export default {
  name: 'CreateNewInvoice',
  components: {
    Basemodal,
    SupplierChooser,
    InvoiceItemSelector,
    Table,
    BaseAlert,
  },
  data() {
    return {
      suppliers: [],
      addItems: false,
      invoice: {},
      mappings: [],
      invoiceItems: [],
      errorMessage: '',
      Alerttype: '',
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),

    companyId() {
      return this.user ? this.user.company_id : null;
    },
  },
  watch: {
    errorMessage(val) {
      if (val) {
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    },
  },
  created() {
    this.fetchSuppliers();
  },
  methods: {
    ...mapActions('inventory', ['updateItem']),

    addItemToInvoice(item) {
      const newItem = {
        invoice_id: this.invoice.invoice_id,
        add_invoice_item: true,
        ...item,
      };
      this.addInvoiceItem(newItem);
    },

    async addInvoiceItem(data) {
      const addItem = await this.updateItem(data);
      this.errorMessage = addItem.message;
      if (addItem.error) this.Alerttype = addItem.error ? 'error' : 'success';
      await this.fetchInvoiceItems();
      if (!addItem.error) this.$refs.SupplierChooser.disableInvoiceAlter();
    },

    async dropInvItem(itemId) {
      const drop = await this.updateItem({ drop_invoice_item: itemId });
      if (drop.error) this.errorMessage = drop.message;
      this.fetchInvoiceItems();
    },

    async fetchInvoiceItems() {
      const items = await this.updateItem({
        fetch_invoice_items: this.invoice.invoice_id,
      });
      if (!items.error) this.invoiceItems = items.data;
      this.Alerttype = items.error ? 'error' : 'success';
    },

    resetForm() {
      this.addItems = false;
    },

    async fetchSuppliers(searchFilter) {
      this.loading = true;
      const Suppliers = await this.updateItem({
        get_suppliers: searchFilter || 'all',
        company_id: this.companyId,
      });
      if (!Suppliers.error) this.suppliers = Suppliers.data;
      this.Alerttype = Suppliers.error ? 'error' : 'success';
      this.loading = false;
    },

    async fetchMappings(id) {
      const Mappings = await this.updateItem({ fetch_supplier_mapping: id });
      if (!Mappings.error) this.mappings = Mappings.data;
      this.Alerttype = Mappings.error ? 'error' : 'success';
    },

    fetchSupplierMappings(data) {
      this.invoice = { ...data };
      this.fetchMappings(data.supplier_id);
      if (data) this.addItems = true;
    },

  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

    .new_purchase {
        height: 500px;
        overflow: hidden !important;
        display: flex;
        flex-direction: column;

        .added_items {
          height: calc(500px - 200px);
          display: flex;
          flex-direction: column;
          // box-shadow: $elevation-low;
          overflow: auto;
        }
    }
</style>
