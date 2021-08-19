<template>
    <Basemodal @close="$emit('close')" :title="'New Expense Head'" :size="600">
        <v-form ref="frmExpenseHead" @submit.prevent="createNewExpensehead" class="pl-2 pr-2">
            <v-text-field
              outlined
              v-model.trim="title"
              label="Expense head title"
              placeholder="eg. utility"
            />
            <v-text-field
              outlined
              v-model.trim="description"
              label="Description"
              placeholder="eg. Electricity and water"
            />
            <BaseAlert v-if="error" :alert="alertType" :message="error" />
            <v-btn block dark class="black mt-3" type="submit">Save</v-btn>
            <LinearLoader v-if="Loading" class="mt-2" />
        </v-form>
    </Basemodal>
</template>
<script>
import { mapActions } from 'vuex';
import Basemodal from '@/components/generics/Basemodal.vue';
import LinearLoader from '@/components/generics/Loading.vue';
import BaseAlert from '@/components/generics/BaseAlert.vue';

export default {
  name: 'CreateExpenseHeadModal',
  components: {
    Basemodal,
    LinearLoader,
    BaseAlert,
  },
  data() {
    return {
      title: '',
      description: '',
      error: '',
      alertType: 'warning',
      Loading: false,
    };
  },
  watch: {
    error() {
      setTimeout(() => {
        this.error = '';
      }, 3000);
    },
  },
  methods: {
    ...mapActions('accounts', ['CreateExpenseHead']),

    async createNewExpensehead() {
      this.error = '';
      if (this.title.length <= 2) {
        this.error = 'Please enter tile';
        this.alertType = 'warning';
      } else if (this.description.length <= 2) {
        this.error = 'Please check description';
        this.alertType = 'warning';
      } else {
        this.Loading = true;
        const data = {
          name: this.title.toUpperCase(),
          description: this.description.toUpperCase(),
        };
        const ExpenseHead = await this.CreateExpenseHead(data);

        if (!ExpenseHead.error) {
          this.error = ExpenseHead.message;
          this.alertType = 'success';
          this.$refs.frmExpenseHead.reset();
          this.$emit('reload');
        } else {
          this.error = ExpenseHead.message;
          this.alertType = 'warning';
        }
        this.Loading = false;
      }
    },
  },
};
</script>
