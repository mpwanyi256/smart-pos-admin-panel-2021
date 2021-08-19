<template>
  <Basemodal
    :title="`Password reset for ${employee.user_name.split(' ')[0].toLowerCase()}`"
    :size="700" @close="$emit('close')">
    <div class="password_reset">
         <BaseTextfield
            v-model.trim="password"
            placeholder="Enter new password"
            :inputType="'password'"
        />
        <div class="options">
            <v-btn
              dark
              class="mr-1 red darken-3"
              @click="$emit('close')">
                Cancel
            </v-btn>
            <v-btn
                :disabled="!isValidPassword"
                @click="passwordResetHandler"
                class="ml-1">
                Reset
            </v-btn>
        </div>
    </div>
  </Basemodal>
</template>
<script>
import { mapActions } from 'vuex';
import Basemodal from '@/components/generics/Basemodal.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';

export default {
  name: 'PasswordResetModal',
  components: {
    Basemodal,
    BaseTextfield,
  },
  props: {
    employee: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      password: '',
    };
  },
  computed: {
    isValidPassword() {
      return this.password.length > 3;
    },
  },
  methods: {
    ...mapActions('settings', ['post']),

    passwordResetHandler() {
      const reset = this.post({
        reset_password: this.employee.id,
        new_password: this.password,
      });
      if (!reset.error) this.$emit('close');
    },
  },
};
</script>
<style scoped lang="scss">
.password_reset {
    height: 250px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;
    padding: 15px;

    .options {
        display: grid;
        grid-template-columns: 50% 50%;
        margin-top: 15px;
    }
}
</style>
