<template>
    <Basemodal
      title="Update landlord info"
      :size="600" @close="$emit('close')">
        <div class="create_landlord">
          <label>First name</label>
          <BaseTextfield v-model="landlord.first_name"
            :preset="landlord.first_name" placeholder="First name"
          />
          <label>Last name</label>
          <BaseTextfield v-model="landlord.last_name"
            :preset="landlord.last_name" placeholder="Last name"
          />
          <label>Contact number</label>
          <BaseTextfield v-model="landlord.contact"
            :preset="landlord.contact" placeholder="Contact number" />
          <label>Email address</label>
          <BaseTextfield v-model="landlord.email"
            :preset="landlord.email" placeholder="Email address" />
          <div class="sbmt_btn mt-4">
            <v-btn :disabled="!isValid || loading" block @click="createLandlord">
                Save updates
            </v-btn>
          </div>
          <div class="red--text darken-3 text-center">
            {{ errorMessage }}
          </div>
        </div>
    </Basemodal>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Basemodal from '@/components/generics/Basemodal.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import validators from '@/mixins/validators';

export default {
  name: 'UpdateLandlord',
  mixins: [validators],
  props: {
    landlord: {
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
      firstname: '',
      lastname: '',
      contact: '',
      email: '',
      errorMessage: '',
      loading: false,
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),
    isValid() {
      return !!(this.isEmail(this.landlord.email) && this.isValidString(this.landlord.first_name)
      && this.isValidString(this.landlord.last_name));
    },
  },
  watch: {
    errorMessage(val) {
      if (val) {
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      }
    },
  },
  methods: {
    ...mapActions('estates', ['post']),

    async createLandlord() {
      this.loading = true;
      const params = {
        first_name: this.landlord.first_name.toUpperCase(),
        last_name: this.landlord.last_name.toUpperCase(),
        contact: this.landlord.contact,
        email: this.landlord.email,
        update_landlord_info: this.landlord.id,
      };
      const LANDLORD = await this.post(params);
      if (!LANDLORD.error) this.$emit('reload');
      else this.errorMessage = LANDLORD.message;
      this.loading = false;
    },
  },
};
</script>
<style scoped>
  .create_landlord {
    min-height: 300px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 16px;
  }
</style>
