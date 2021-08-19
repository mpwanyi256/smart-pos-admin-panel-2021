<template>
  <Basemodal :title="supplier.name" :size="700" @close="$emit('close')">
    <div class="supplier_info">
        <v-form @submit.prevent="updateSupplier">
          <v-text-field dense outlined label="Name" v-model.trim="name" />
          <v-text-field dense outlined label="Contact" v-model.trim="contact" />
          <v-text-field dense outlined label="Email" v-model.trim="email" />
          <v-btn type="submit" block :disabled="!isValidForm">Update</v-btn>
        </v-form>
    </div>
    <LinearLoader v-if="loading" />
  </Basemodal>
</template>
<script>
import { mapActions } from 'vuex';
import Basemodal from '@/components/generics/Basemodal.vue';
import validators from '@/mixins/validators';
import LinearLoader from '@/components/generics/Loading.vue';

export default {
  name: 'UpdateSupplierInfo',
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
    };
  },
  created() {
    if (!this.supplier) this.$emit('close');
    this.name = this.supplier.name;
    this.email = this.supplier.email;
    this.contact = this.supplier.contact;
  },
  computed: {
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
        name: this.name,
        email: this.email,
        contact: this.contact,
        update_supplier_info: true,
        id: this.supplier.id,
      };
      const updateData = await this.updateItem(update);
      if (!updateData.error) this.$emit('reload');
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
