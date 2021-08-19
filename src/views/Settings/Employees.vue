<template>
  <PageTemplate class="page" title="Employees">
    <template slot="header-actions">
        <BaseTextfield v-model="search" placeholder="Search" />
        <BaseTooltip
            @button="openAddUserModal = true"
            message="Create new employee"
            icon="plus"
            color="black"
        />
      </template>
      <template slot="body">
        <Table>
          <template slot="header">
            <tr>
                  <th>Full name</th>
                  <th>USERNAME</th>
                  <th>ROLE</th>
                  <th>OUTLET</th>
                  <th>RESET</th>
                  <th>IS ACTIVE</th>
                  <th>&nbsp;</th>
              </tr>
          </template>
          <template slot="body">
            <tr v-for="(employee, i) in filteredEmployees" :key="i">
              <td>
                <div class="user_avatar">
                  <Avatar src="" />
                  {{ employee.full_name }}
                </div>
              </td>
              <td>{{ employee.user_name }}</td>
              <td>
                {{ employee.role }}
              </td>
              <td>
                {{ employee.outlet_name }}
              </td>
              <td>
                  <v-btn small text
                      @click="resetEmployeePassword(employee)"
                  >
                      <v-icon left small>
                          mdi-security
                      </v-icon>
                      password
                  </v-btn>
              </td>
              <td>
                <v-btn small
                  @click="updateEmployeeStatus(!employee.is_active, employee)"
                  :color="employee.is_active ? 'green' : 'red'"
                  dark
                >
                  {{ employee.is_active ? 'YES' : 'NO' }}
                </v-btn>
              </td>
              <td>
                  <v-btn small fab
                    @click="updateEmployeeInfo(employee)"
                  >
                      <v-icon>
                          mdi-pencil
                      </v-icon>
                  </v-btn>
              </td>
            </tr>
          </template>
        </Table>
         <PasswordResetModal
            v-if="reset && selectedEmployee"
            :employee="selectedEmployee"
            @close="reset = false"
        />
        <CreateUserModal
          v-if="openAddUserModal"
          @close="openAddUserModal = false"
          @refetch="refetchHandler"
        />
        <UpateUserModal
          v-if="openEditEmployeeModal && selectedEmployee"
          :employee="selectedEmployee"
          @close="openEditEmployeeModal = false"
          @refetch="refetchHandler"
        />
      </template>
  </PageTemplate>
</template>
<script>
import { mapActions } from 'vuex';
import Table from '@/components/generics/new/Table.vue';
import PageTemplate from '@/views/estates/PageTemplate.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import BaseTooltip from '@/components/generics/BaseTooltip.vue';
import PasswordResetModal from '@/components/settings/PasswordResetModal.vue';
import CreateUserModal from '@/components/settings/CreateUserModal.vue';
import UpateUserModal from '@/components/settings/UpdateUserModal.vue';
import Avatar from '@/components/generics/new/Avatar.vue';

export default {
  name: 'Employees',
  components: {
    Table,
    PageTemplate,
    BaseTextfield,
    BaseTooltip,
    PasswordResetModal,
    CreateUserModal,
    UpateUserModal,
    Avatar,
  },
  data() {
    return {
      employees: [],
      selectedEmployee: null,
      reset: false,
      search: '',
      openAddUserModal: false,
      openEditEmployeeModal: false,
    };
  },
  computed: {
    filteredEmployees() {
      return this.employees.filter((Employee) => Employee.user_name.toLowerCase()
        .match(this.search.toLowerCase())
        || Employee.role.toLowerCase().match(this.search.toLowerCase()));
    },
  },
  async created() {
    await this.fetchEmployees();
  },
  methods: {
    ...mapActions('settings', ['post']),

    updateEmployeeInfo(emp) {
      this.selectedEmployee = emp;
      this.openEditEmployeeModal = true;
    },

    async updateEmployeeStatus(status, employee) {
      const empStatus = {
        toggle_employee_status: status ? 1 : 0,
        employee: employee.id,
      };
      const stateUpdate = await this.post(empStatus);
      if (!stateUpdate.error) await this.fetchEmployees();
    },

    async fetchEmployees() {
      const emps = await this.post({ fetch_users: 'all' });
      if (!emps.error) this.employees = emps.data;
    },

    async refetchHandler() {
      await this.fetchEmployees();
      this.openAddUserModal = false;
      this.openEditEmployeeModal = false;
    },

    resetEmployeePassword(emp) {
      this.selectedEmployee = emp;
      this.reset = true;
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.employees {
  height: calc(100vh - 52px);
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  color: $black;
  font-size: 13px !important;
}

.user_avatar {
  display: flex;
  align-items: center;
  gap: 10px;
}

</style>
