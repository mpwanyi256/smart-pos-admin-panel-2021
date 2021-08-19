<template>
    <Basemodal :title="'New category'" :size="400" @close="$emit('close')">
        <div class="new_category_form">
          <v-form @submit.prevent="createCategory">
            <v-text-field small outlined label="Name" v-model.trim="categoryName" />
            <v-btn block type="submit">Create</v-btn>
            <div class="error_alert">
              {{ errorMessage }}
            </div>
          </v-form>
        </div>
    </Basemodal>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Basemodal from '@/components/generics/Basemodal.vue';

export default {
  name: 'CreateNewCategoryModal',
  components: {
    Basemodal,
  },
  data() {
    return {
      categoryName: '',
      errorMessage: '',
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
      this.errorMessage = createCat.message;
    },
  },
};
</script>
<style lang="scss">
  .new_category_form {
    padding: 16px;
  }

  .error_alert {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
    font-size: 14px;
    line-height: 1.5;
  }
</style>
