<template>
    <div class="employees">
        <Table>
            <template slot="header">
                <tr>
                    <th>
                        <BaseTextfield
                          v-model="search" placeholder="Search" />
                    </th>
                    <th>ROLE</th>
                    <th>JOINED</th>
                    <th>RESET</th>
                    <th>IS ACTIVE</th>
                    <th>
                        <v-btn @click="openAddUserModal = true">
                            <v-icon left>
                                mdi-plus
                            </v-icon>
                            Add user
                        </v-btn>
                    </th>
                </tr>
            </template>
            <template slot="body">
                <tr v-for="(employee, i) in filteredEmployees" :key="i">
                    <td>
                      <div class="user_avatar">
                        <Avatar src="" />
                        {{ employee.user_name }}
                      </div>
                    </td>
                    <td>
                      {{ employee.role }}
                    </td>
                    <td>
                      {{ employee.date_joined }}
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
                        <v-btn small
                          @click="updateEmployeeInfo(employee)"
                        >
                            <v-icon left small>
                                mdi-pencil
                            </v-icon>
                            Update
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
    </div>
</template>
<script>
import Table from '@/components/generics/new/Table.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import PasswordResetModal from '@/components/settings/PasswordResetModal.vue';
import CreateUserModal from '@/components/settings/CreateUserModal.vue';
import UpateUserModal from '@/components/settings/UpdateUserModal.vue';
import Avatar from '@/components/generics/new/Avatar.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Employees',
  components: {
    Table,
    BaseTextfield,
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
