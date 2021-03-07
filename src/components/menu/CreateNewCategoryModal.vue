<template>
    <Basemodal :title="'New category'" :size="400" @close="$emit('close')">
        <div class="new_category_form">
          <v-form @submit.prevent="createCategory">
            <v-text-field small outlined label="Name" v-model.trim="categoryName" />
            <v-btn block type="submit">Create</v-btn>
          </v-form>
        </div>
    </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'CreateNewCategoryModal',
  components: {
    Basemodal,
  },
  data() {
    return {
      categoryName: '',
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),
  },
  methods: {
    ...mapActions('menu', ['CreateMenuCategory']),

    async createCategory() {
      const newCat = {
        company_id: this.user.company_id,
        name: this.categoryName,
      };
      const createCat = await this.CreateMenuCategory(newCat);
      if (!createCat.error) this.$emit('refresh');
      console.log('Cat', createCat);
    },
  },
};
</script>
<style lang="scss">
  .new_category_form {
    padding: 16px;
  }
</style>
