<template>
  <Basemodal
    :title="`Update user account`"
    :size="700" @close="$emit('close')">
    <div class="create_user">
      <v-text-field
        outlined dense
        label="First name"
        v-model="firstName"
        placeholder="Enter full name"
        inputType="text"
      />
      <v-text-field
        outlined dense
        v-model="lastName"
        label="Last name"
        inputType="text"
      />
      <v-text-field
        outlined dense
        v-model="name"
        label="User name"
        inputType="text"
      />
      <v-select outlined
        dense
        v-model="employeeOutletId"
        :items="outlets"
        item-value="id"
        item-text="name"
        label="Outlet / branch"
        class="mt-3"
      />
      <v-select outlined
        dense
        v-model="role"
        :items="roles"
        item-value="id"
        item-text="name"
        label="User role"
      />
      <div class="options">
        <v-spacer></v-spacer>
          <v-btn
              @click="createUserHandler"
              class="ml-1">
              Update user account
          </v-btn>
      </div>
    </div>
  </Basemodal>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Basemodal from '@/components/generics/Basemodal.vue';
// import BaseTextfield from '@/components/generics/BaseTextfield.vue';

export default {
  name: 'UpateUserModal',
  props: {
    employee: {
      type: Object,
      required: true,
    },
  },
  components: {
    Basemodal,
    // BaseTextfield,
  },
  data() {
    return {
      roles: [],
      name: '',
      role: 1,
      firstName: '',
      lastName: '',
      employeeOutletId: 0,
      outlets: [],
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),

    hasChange() {
      return (this.name.length > 3 && this.employee.user_name !== this.name)
      || this.employee.role_id !== this.role;
    },
  },
  async created() {
    this.name = this.employee.user_name;
    this.role = this.employee.role_id;
    this.lastName = this.employee.last_name;
    this.firstName = this.employee.first_name;
    this.employeeOutletId = this.employee.user_outlet_id;
    await this.getOutlets();
    await this.fetchDbRoles();
  },
  methods: {
    ...mapActions('settings', ['post']),

    async getOutlets() {
      const OUTLETS = await this.post({ fetch_company_outlets: 'all' }).catch(() => null);
      if (OUTLETS) this.outlets = OUTLETS.data;
    },

    async fetchDbRoles() {
      const Roles = await this.post({ get_user_roles: 'all' });
      this.roles = Roles.data;
    },

    async createUserHandler() {
      const newUser = await this.post({
        update_user_account: this.employee.id,
        user_name: this.name,
        first_name: this.firstName,
        last_name: this.lastName,
        role: this.role,
        outlet_id: this.employeeOutletId,
      });
      if (!newUser.error) this.$emit('refetch');
    },
  },
};
</script>
<style scoped lang="scss">
.create_user {
    min-height: 250px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 15px;

    .options {
      display: flex;
      flex-direction: row;
      gap: 10px;
      margin-top: 15px;
      // align-items: right;
    }

}
</style>
