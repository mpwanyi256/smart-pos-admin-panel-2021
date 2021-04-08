<template>
    <div class="suppliers">
        <Table>
            <template slot="header">
                <tr>
                    <th><BaseTextfield v-model="search" placeholder="Find a supplier" /></th>
                    <th>Contact</th>
                    <th>Email address</th>
                    <th>&nbsp;</th>
                </tr>
            </template>
            <template slot="body">
            <LinearLoader v-if="loading" />
                <tr v-else
                    v-for="supplier in suppliers" :key="supplier.id"
                >
                    <td>{{ supplier.name }}</td>
                    <td>{{ supplier.contact }}</td>
                    <td>{{ supplier.email }}</td>
                    <td>
                        <v-btn small icon>
                            <v-icon>
                                mdi-pencil
                            </v-icon>
                        </v-btn>
                    </td>
                </tr>
            </template>
        </Table>
    </div>
</template>
<script>
import Table from '@/components/generics/new/Table.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import LinearLoader from '@/components/generics/Loading.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Suppliers',
  components: {
    Table,
    BaseTextfield,
    LinearLoader,
  },
  data() {
    return {
      suppliers: [],
      search: '',
      loading: false,
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),

    companyId() {
      return this.user ? this.user.company_id : null;
    },
  },
  watch: {
    search(val) {
      if (val.length >= 3) {
        setTimeout(() => {
          this.fetchSuppliers(val);
        }, 1000);
      } else {
        this.fetchSuppliers('all');
      }
    },
  },
  created() {
    this.fetchSuppliers('all');
  },
  methods: {
    ...mapActions('inventory', ['updateItem']),

    async fetchSuppliers(searchFilter) {
      this.loading = true;
      const Suppliers = await this.updateItem({
        get_suppliers: searchFilter,
        company_id: this.companyId,
      });
      if (!Suppliers.error) this.suppliers = Suppliers.data;
      this.loading = false;
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

    .suppliers {
        height: calc(100vh - 62px);
        width: 100%;
        display: flex;
        flex-direction: column;
        overflow: auto;
        color: $black;
    }

</style>
