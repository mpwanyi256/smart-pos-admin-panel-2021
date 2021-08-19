<template>
    <div class="company_departments">
        <Table>
            <template slot="header">
                <th>#</th>
                <th>Department</th>
                <th>Printer</th>
                <th>Connection type</th>
                <th>Printer info</th>
            </template>
            <template slot="body">
                <tr v-for="(department, i) in actualDepartments"
                    :key="`department-${department.id}`"
                >
                    <td>{{ i + 1 }}</td>
                    <td>{{ department.name }}</td>
                    <td>{{ department.printer.address || 'Not set' }}</td>
                    <td>{{ department.printer.connection_type }}</td>
                    <td>
                      <v-btn fab small
                        @click="config(department)"
                      >
                        <v-icon>mdi-cog</v-icon>
                      </v-btn>
                    </td>
                </tr>
                <tr>
                  <td>{{ actualDepartments.length + 1 }}</td>
                  <td>BILL</td>
                    <td>{{ billConf.printer.address || 'Not set' }}</td>
                    <td>{{ billConf.printer.connection_type }}</td>
                    <td>
                      <v-btn fab small
                        @click="config(billConf)"
                      >
                        <v-icon>mdi-cog</v-icon>
                      </v-btn>
                    </td>
                </tr>
            </template>
        </Table>
        <PrinterConfig
            v-if="setPrinter && selectedDepartment"
            @close="setPrinter = false"
            @reload="fetchMenuDepartments"
            :department="selectedDepartment"
        />
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Table from '@/components/generics/new/Table.vue';
import PrinterConfig from '@/components/settings/PrinterConfig.vue';

export default {
  name: 'Departments',
  components: {
    Table,
    PrinterConfig,
  },
  data() {
    return {
      setPrinter: false,
      selectedDepartment: null,
      billConf: {
        id: 0,
        name: 'BILL',
        printer: {
          address: '',
          connection_type: '',
        },
      },
    };
  },
  computed: {
    ...mapGetters('menu', ['departments']),
    ...mapGetters('auth', ['user']),

    actualDepartments() {
      return this.departments.filter((Dep) => Dep.id !== 0);
    },
  },
  async created() {
    await this.fetchMenuDepartments();
    this.getBarPrinterConf();
  },
  methods: {
    ...mapActions('menu', ['getDepartments']),
    ...mapActions('settings', ['post']),

    getBarPrinterConf() {
      this.post({
        get_department_printer_config: 0,
        company_id: this.user.company_id,
      }).then((res) => {
        this.billConf.printer = res.data;
      });
    },

    async fetchMenuDepartments() {
      await this.getDepartments(0);
      this.getBarPrinterConf();
      this.setPrinter = false;
    },

    config(dep) {
      this.selectedDepartment = dep;
      this.setPrinter = true;
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

    .company_departments {
        height: calc(100vh - 52px);
        width: 100%;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        color: $black;
        font-size: 13px !important;
    }
</style>
