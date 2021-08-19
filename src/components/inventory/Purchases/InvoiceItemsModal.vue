<template>
    <Basemodal
        :title="`#${invoice.inv_no.toUpperCase()} ITEMS |
            ${invoice.date} (${invoice.supplier})`"
        :size="1200" @close="$emit('close')"
    >
        <div class="invoices_display">
            <Table>
                <template slot="header">
                    <tr>
                        <th>Item name</th>
                        <th>Pack size</th>
                        <th>Packs</th>
                        <th>Total</th>
                        <th>Unit price</th>
                        <th>Amount</th>
                    </tr>
                </template>
                <template slot="body">
                    <tr v-for="(item, i) in invoiceItems" :key="i">
                        <td>{{ item.name.toUpperCase() }}</td>
                        <td>{{ item.pack_size }}</td>
                        <td>{{ item.packs_received }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>{{ item.unit_price }}</td>
                        <td>{{ item.item_cost }}</td>
                    </tr>
                </template>
            </Table>
        </div>
    </Basemodal>
</template>
<script>
import { mapActions } from 'vuex';
import Basemodal from '@/components/generics/Basemodal.vue';
import Table from '@/components/generics/new/Table.vue';

export default {
  name: 'InvoiceItemsModal',
  components: {
    Basemodal,
    Table,
  },
  props: {
    invoice: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      invoiceItems: [],
    };
  },
  async created() {
    await this.fetchInvoiceItems(this.invoice.id);
  },
  methods: {
    ...mapActions('inventory', ['updateItem']),

    async fetchInvoiceItems(invoiceId) {
      const items = await this.updateItem({
        fetch_invoice_items: invoiceId,
      });
      if (!items.error) this.invoiceItems = items.data;
    },
  },
};
</script>
<style scoped>
    .invoices_display {
        height: 500px;
        overflow: hidden !important;
        display: flex;
        flex-direction: column;
    }
</style>
