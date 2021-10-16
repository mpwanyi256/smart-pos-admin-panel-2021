<template>
  <Basemodal :title="'Create new supplier'" :size="700" @close="$emit('close')">
    <div class="supplier_info">
        <v-form @submit.prevent="updateSupplier">
          <v-text-field dense outlined label="Name" v-model.trim="name" />
          <v-text-field dense outlined label="Contact" v-model.trim="contact" />
          <v-text-field dense outlined label="Email" v-model.trim="email" />
          <v-btn type="submit" block :disabled="!isValidForm">Update</v-btn>
        </v-form>
        <p class="text-center mt-2 red--text darken-3" v-if="error">{{ error }}</p>
    </div>
    <LinearLoader v-if="loading" />
  </Basemodal>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Basemodal from '@/components/generics/Basemodal.vue';
import validators from '@/mixins/validators';
import LinearLoader from '@/components/generics/Loading.vue';

export default {
  name: 'CreateSupplierModal',
  mixins: [
    validators,
  ],
  components: {
    Basemodal,
    LinearLoader,
  },
  props: {
    supplier: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      name: '',
      contact: '',
      email: '',
      loading: false,
      error: '',
    };
  },
  watch: {
    error(val) {
      if (val) {
        setTimeout(() => {
          this.error = '';
        }, 3000);
      }
    },
  },
  computed: {
    ...mapGetters('auth', ['user']),

    companyId() {
      return this.user ? this.user.company_id : null;
    },

    isValidForm() {
      return this.name.length > 3 && this.contact.length > 3;
    },

    isAnEmail() {
      return this.isEmail(this.emai);
    },
  },
  methods: {
    ...mapActions('inventory', ['updateItem']),

    async updateSupplier() {
      this.loading = true;
      const update = {
        name: this.name.toUpperCase(),
        email: this.email,
        contact: this.contact,
        company_id: this.companyId,
        create_supplier: true,
      };
      const createSupplier = await this.updateItem(update);
      if (!createSupplier.error) this.$emit('reload');
      else this.error = createSupplier.message;
      this.loading = false;
    },
  },
};
</script>
<style scoped>
    .supplier_info {
        min-height: 300px;
        padding: 15px;
    }
</style>
