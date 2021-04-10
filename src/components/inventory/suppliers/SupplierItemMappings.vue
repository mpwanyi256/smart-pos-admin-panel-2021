<template>
    <Table>
        <template slot="header">
            <tr>
                <th>Item name</th>
                <th>&nbsp;</th>
            </tr>
        </template>
        <template slot="body">
            <tr
                v-for="item in mappings" :key="item.id"
            >
                <td>{{ item.item_name }}</td>
                <td>
                    <v-btn icon @click="removeItem(item)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </td>
            </tr>
        </template>
    </Table>
</template>
<script>
import Table from '@/components/generics/new/Table.vue';
// import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import { mapActions } from 'vuex';

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
