<template>
  <Basemodal
    :title="`Create new user account`"
    :size="700" @close="$emit('close')">
    <div class="create_user">
      <label>Full name</label>
      <BaseTextfield
        v-model.trim="fullname"
        placeholder="Enter full name"
        :inputType="'text'"
      />
      <label>User role</label>
      <v-select outlined
        dense
        v-model="role"
        :items="roles"
        item-value="id"
        item-text="name"
      />
      <label>Password</label>
      <BaseTextfield
        v-model.trim="password"
        placeholder="password"
        :inputType="'password'"
      />
      <label>Confirm password</label>
      <BaseTextfield
        v-model.trim="passwordConfirm"
        placeholder="confirm password"
        :inputType="'password'"
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
              :disabled="!isValidPassword"
              @click="createUserHandler"
              class="ml-1">
              Create user account
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
  name: 'CreateUserModal',
  components: {
    Basemodal,
    BaseTextfield,
  },
  data() {
    return {
      roles: [],
      fullname: '',
      role: 1,
      password: '',
      passwordConfirm: '',
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),
    isValidPassword() {
      return this.fullname.length > 3 && this.password.length > 3
      && (this.password === this.passwordConfirm);
    },
  },
  async created() {
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
        create_user_account: this.user.company_id,
        user_name: this.fullname,
        role: this.role,
        password: this.password,
        token: new Date().getMilliseconds(),
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
