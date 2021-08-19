<template>
    <PageTemplate class="page" title="Company departments">
        <template slot="header-actions">
        <BaseTextfield v-model="search" placeholder="Search" />
        <BaseTooltip
            @button="createDepartment = true"
            message="Create new department"
            icon="plus"
            color="black"
        />
      </template>
      <template slot="body">
        <div class="table_display">
            <Table>
                <template slot="header">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>&nbsp;</th>
                    </tr>
                </template>
                <template slot="body">
                    <tr v-for="(department, i) in departments" :key="`department_${department.id}`">
                        <td>{{ ++i }}</td>
                        <td>{{ department.name }}</td>
                        <td>
                            <BaseTooltip
                                @button="updateDepartment(department)"
                                message="Update department"
                                icon="information"
                            />
                        </td>
                    </tr>
                </template>
            </Table>

          <SingleFieldUpdateModal
            v-if="showUpdate"
            placeholder="Update section details"
            :preset="selectedDepartment.name"
            @close="showUpdate = false"
            @save="updateDepartmentInfo($event)"
          />

          <SingleFieldUpdateModal
            v-if="createDepartment"
            placeholder="Create department"
            @close="createDepartment = false"
            @save="createNewDepartment($event)"
          />
        </div>
      </template>
    </PageTemplate>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Table from '@/components/generics/new/Table.vue';
import PageTemplate from '@/views/estates/PageTemplate.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import BaseTooltip from '@/components/generics/BaseTooltip.vue';
import SingleFieldUpdateModal from '@/components/generics/new/SingleFieldUpdateModal.vue';

export default {
  name: 'CompanyDepartments',
  components: {
    PageTemplate,
    Table,
    BaseTextfield,
    BaseTooltip,
    SingleFieldUpdateModal,
  },
  data() {
    return {
      departments: [],
      search: '',
      showUpdate: false,
      selectedDepartment: '',
      createDepartment: false,
    };
  },

  computed: {
    ...mapGetters('auth', ['user']),
  },

  async created() {
    await this.fetchMenuDepartments();
  },

  methods: {
    ...mapActions('settings', ['post']),

    updateDepartment(dept) {
      this.selectedDepartment = dept;
      this.showUpdate = true;
    },

    async createNewDepartment(deptName) {
      await this.post({
        create_new_department: deptName.toUpperCase(),
      });
      await this.fetchMenuDepartments();
      this.createDepartment = false;
    },

    async updateDepartmentInfo(newName) {
      await this.post({
        update_department_info: this.selectedDepartment.id,
        name: newName.toUpperCase(),
      });
      await this.fetchMenuDepartments();
      this.showUpdate = false;
    },

    async fetchMenuDepartments() {
      const departments = await this.post({ get_departments: 'all' });
      if (!departments.error) {
        this.departments = [
          ...departments.data,
        ];
      }
    },

  },
};
</script>
