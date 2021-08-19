<template>
    <Basemodal :title="'Create new menu item'" :size="700" @close="$emit('close')">
      <div class="update_area">
        <v-form ref="addItemForm" @submit.prevent="createNewMenuItem">
          <v-text-field dense outlined label="Item name" v-model="name" />
          <v-text-field dense outlined label="Item price" v-model="price" />
          <v-select
            dense outlined
            label="Category"
            :items="categories"
            item-text="name"
            item-value="id"
            v-model="categoryId"
          />
          <v-select
            dense outlined
            label="Department"
            :items="filteredDepartments"
            item-text="name"
            item-value="id"
            v-model="display"
          />
          <v-btn block type="submit" dense>Add item</v-btn>
        </v-form>
      </div>
      <BaseAlert v-if="error" :alert="alert" :message="errorMessage" />
      <LinearLoader v-if="loading" />
    </Basemodal>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Basemodal from '@/components/generics/Basemodal.vue';
import LinearLoader from '@/components/generics/Loading.vue';
import BaseAlert from '@/components/generics/BaseAlert.vue';

export default {
  name: 'CreateNewMenuItem',
  components: {
    Basemodal,
    LinearLoader,
    BaseAlert,
  },
  data() {
    return {
      name: '',
      categoryId: '',
      display: '',
      price: '',
      loading: false,
      error: false,
      errorMessage: '',
      alert: 'error',
    };
  },
  computed: {
    ...mapGetters('menu', ['categories', 'departments']),
    ...mapGetters('auth', ['user']),

    filteredDepartments() {
      return this.departments.filter((Dep) => Dep.name !== 'ALL');
    },
  },
  created() {
    this.getMenuCategories();
  },
  watch: {
    error(val) {
      if (val) {
        setTimeout(() => {
          this.error = false;
        }, 3000);
      }
    },
  },
  methods: {
    ...mapActions('menu', ['getMenuCategories', 'updateItem', 'createNewItem']),
    ...mapActions('auth', ['setError']),

    async createNewMenuItem() {
      if (!this.name || !this.categoryId || !this.display || !this.price) {
        this.alert = 'error';
        this.errorMessage = 'Please fill in all fields';
        this.error = true;
        return;
      }
      this.loading = true;
      const menuItem = {
        name: this.name.toUpperCase(),
        category_id: this.categoryId,
        display: this.display,
        price: parseInt(this.price, 10),
        company_id: this.user.company_id,
      };
      const create = await this.createNewItem(menuItem);
      if (create.error) {
        this.alert = 'error';
        this.errorMessage = create.message;
        this.error = true;
        this.loading = false;
        return;
      }
      this.$refs.addItemForm.reset();
      this.alert = 'success';
      this.errorMessage = create.message;
      this.error = true;
      this.loading = false;
    },
  },
};
</script>
<style scoped>
  .update_area {
    padding: 15px;
    min-height: 300px;
  }
</style>
