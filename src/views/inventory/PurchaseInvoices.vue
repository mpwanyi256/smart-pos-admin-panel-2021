<template>
    <div class="purchases_section">
        <Table>
            <template slot="header">
                <tr>
                    <th>
                        <div class="purchases_filter">
                            <BaseTooltip
                                @button="createInvModal = true"
                                message="Create new purchase" icon="plus"
                                color="green"
                            />
                            <BaseTextfield v-model="search" placeholder="Search by inv No." />
                        </div>
                    </th>
                    <th>Invoice No.</th>
                    <th>Date</th>
                    <th>Invoice amount</th>
                    <th>Added by</th>
                    <th>&nbsp;</th>
                </tr>
            </template>
            <template slot="body">
                <tr v-for="(invoice, i) in invoices" :key="i">
                    <td>{{ invoice.supplier }}</td>
                    <td>{{ invoice.inv_no }}</td>
                    <td>{{ invoice.date }}</td>
                    <td>{{ invoice.inv_amount_display }}</td>
                    <td>{{ invoice.added_by }}</td>
                    <td>
                        &nbsp;
                    </td>
                </tr>
            </template>
        </Table>
        <CreateNewInvoice
            v-if="createInvModal"
            @close="reloadInvoices"
        />
    </div>
</template>
<script>
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import BaseTooltip from '@/components/generics/BaseTooltip.vue';
import Table from '@/components/generics/new/Table.vue';
import CreateNewInvoice from '@/components/inventory/Purchases/CreateNewInvoice.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Purchases',
  components: {
    Table,
    BaseTooltip,
    BaseTextfield,
    CreateNewInvoice,
  },
  data() {
    return {
      search: '',
      createInvModal: false,
      invoices: [],
    };
  },
  async created() {
    await this.fetchInvoices();
  },
  methods: {
    ...mapActions('inventory', ['updateItem']),

    async fetchInvoices() {
      const Invoices = await this.updateItem({
        fetch_invoices: 'all',
      });
      if (!Invoices.error) this.invoices = Invoices.data;
    },

    async reloadInvoices() {
      this.createInvModal = false;
      await this.fetchInvoices();
    },

  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

    .purchases_section {
        height: calc(100vh - 52px);
        width: 100%;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        color: $black;
    }

    .purchases_filter {
        display: flex;
        flex-direction: row;
        gap: 10px;
        // justify-content: center;
        align-items: center;
    }
</style>
