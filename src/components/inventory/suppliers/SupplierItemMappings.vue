<template>
    <Table>
        <template slot="header">
            <tr>
                <th>Supplier's list items</th>
                <th>Av. price</th>
                <th>Remove</th>
            </tr>
        </template>
        <template slot="body">
            <tr
                v-for="item in mappings" :key="item.id"
            >
                <td>{{ item.item_name }}</td>
                <td>{{ item.average_price_display === '0' ?
                  'No puchases yet' : item.average_price_display }}</td>
                <td>
                    <v-btn class="drop_mapping_btn" icon @click="removeItem(item)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </td>
            </tr>
        </template>
    </Table>
</template>
<script>
import { mapActions } from 'vuex';
import Table from '@/components/generics/new/Table.vue';

export default {
  name: 'SupplierItemMappings',
  props: {
    mappings: {
      type: Array,
      required: true,
    },
  },
  components: {
    Table,
  },
  data() {
    return {
      search: '',
      loading: false,
    };
  },
  methods: {
    ...mapActions('inventory', ['updateItem']),

    async removeItem(item) {
      this.loading = true;
      const mapping = {
        drop_supplier_item_mapping: item.id,
      };
      const updateMappung = await this.updateItem(mapping);
      if (!updateMappung.error) this.$emit('reload');
      this.loading = false;
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

  .drop_mapping_btn {
    color: $red!important;
  }
</style>
