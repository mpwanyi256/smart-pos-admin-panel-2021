<template>
  <div class="inv_main">
    <LinearLoader v-if="loading" />
    <Table>
      <template slot="header">
        <th>
          <div class="download">
            <BaseTooltip
              @button="downloadCSV"
              message="Download csv" icon="download"
              color="green"
            />
            <BaseTextfield v-model="search" placeholder="Search" />
          </div>
        </th>
        <th>Pack Size</th>
        <th>Unit price</th>
        <th>Min Stock</th>
        <th>In Stock</th>
        <th>Stock Value</th>
      </template>
      <template slot="body">
          <tr v-for="(item, i) in inventoryFiltered" :key="i">
              <td>{{ item.item_name.toUpperCase() }}</td>
              <td>{{ item.pack_size }}</td>
              <td>{{ item.unit_price }}</td>
              <td>{{ item.minimum_stock }}</td>
              <td>{{ item.available_stock }} {{ item.unit_measure }}</td>
              <td> {{ item.available_stock_value }} </td>
          </tr>
      </template>
    </Table>
  </div>
</template>
<script>
import Table from '@/components/generics/new/Table.vue';
import BaseTooltip from '@/components/generics/BaseTooltip.vue';
import LinearLoader from '@/components/generics/Loading.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import DownloadCSVMixin from '@/mixins/DownloadCSVMixin';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'InventoryDashboard',
  mixins: [DownloadCSVMixin],

  components: {
    Table,
    LinearLoader,
    BaseTextfield,
    BaseTooltip,
  },

  data() {
    return {
      inventory: [],
      loading: true,
      dateSelected: '',
      search: '',
    };
  },

  computed: {
    ...mapGetters('auth', ['user']),

    inventoryFiltered() {
      return this.inventory.length
        ? this.inventory.filter((Item) => Item.item_name.toLowerCase()
          .match(this.search.toLowerCase())) : [];
    },

    dayOpen() {
      return this.user.company_info ? this.user.company_info.day_open : null;
    },
  },

  async created() {
    this.$nextTick(async () => {
      this.dateSelected = this.dayOpen;
      if (this.dayOpen) await this.fetchInventory();
    });
  },

  methods: {
    ...mapActions('inventory', ['updateItem']),

    async fetchInventory() {
      this.loading = true;
      this.updateItem({
        get_inventory_status: this.dateSelected,
        company_id: localStorage.getItem('smart_company_id'),
      })
        .then((inv) => {
          this.inventory = inv.data;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },

    downloadCSV() {
      this.download(this.inventory.data, `Inventory As At ${this.dayOpen}`);
    },
  },

};
</script>
<style scoped>
.download {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>
