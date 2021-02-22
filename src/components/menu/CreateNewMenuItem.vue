<template>
    <Basemodal :title="'Update menu item'" :size="700" @close="$emit('close')">
      <div class="update_area">
        <v-form @submit.prevent="createNewMenuItem">
          <v-text-field dense outlined label="Item name" v-model="name" />
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
            label="Section"
            :items="filteredDepartments"
            item-text="name"
            item-value="id"
            v-model="display"
          />
          <v-text-field dense outlined label="Item price" v-model="price" />
          <v-btn block type="submit" dense>Update</v-btn>
        </v-form>
      </div>{{ user }}
      <LinearLoader v-if="loading" />
    </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';
import LinearLoader from '@/components/generics/Loading.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'CreateNewMenuItem',
  components: {
    Basemodal,
    LinearLoader,
  },
  data() {
    return {
      name: '',
      categoryId: '',
      display: '',
      price: '',
      loading: false,
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
  methods: {
    ...mapActions('menu', ['getMenuCategories', 'updateItem']),
    ...mapActions('auth', ['setError']),

    createNewMenuItem() {
      const menuItem = {
        name: this.name,
        category_id: this.categoryId,
        display: this.display,
        price: parseInt(this.price, 10),
        company_id: this.user.company_id,
      };
      console.log('new itemm', menuItem);
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
