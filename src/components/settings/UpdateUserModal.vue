<template>
  <Basemodal
    :title="`Update user account`"
    :size="700" @close="$emit('close')">
    <div class="create_user">
      <label>Full name
        <span class="grey--text lighten-2">
          ({{ employee.user_name }})
        </span></label>
      <BaseTextfield
        v-model="name"
        :preset="name"
        placeholder="Enter full name"
        inputType="text"
      />
      <label>User role</label>
      <v-select outlined
        dense
        v-model="role"
        :items="roles"
        item-value="id"
        item-text="name"
      />
      <div class="options">
        <v-spacer></v-spacer>
          <v-btn
            dark
            class="mr-1 red darken-3"
            @click="$emit('close')">
              Cancel
          </v-btn>
          <v-btn
              :disabled="!hasChange"
              @click="createUserHandler"
              class="ml-1">
              Update user account
          </v-btn>
      </div>
    </div>
  </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import { mapActions, mapGetters } from 'vuex';

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
    BaseTextfield,
  },
  data() {
    return {
      roles: [],
      name: '',
      role: 1,
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),

    hasChange() {
      return this.name.length > 3 && this.employee.user_name !== this.name;
    },
  },
  async created() {
    this.name = this.employee.user_name;
    this.role = this.employee.role_id;
    await this.fetchDbRoles();
  },
  methods: {
    ...mapActions('settings', ['post']),

    async fetchDbRoles() {
      const Roles = await this.post({ get_user_roles: 'all' });
      this.roles = Roles.data;
    },

    createUserHandler() {
      const newUser = this.post({
        update_user_account: this.employee.id,
        user_name: this.name,
        role: this.role,
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
