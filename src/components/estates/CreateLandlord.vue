<template>
    <Basemodal
      title="Create new landlord"
      :size="600" @close="$emit('close')">
        <div class="create_landlord">
          <label>First name</label>
          <BaseTextfield v-model="firstname" placeholder="First name" />
          <label>Last name</label>
          <BaseTextfield v-model="lastname" placeholder="Last name" />
          <label>Contact number</label>
          <BaseTextfield v-model="contact" placeholder="Contact number" />
          <label>Email address</label>
          <BaseTextfield v-model="email" placeholder="Email address" />
          <div class="sbmt_btn mt-4">
            <v-btn :disabled="!isValid || loading" block @click="createLandlord">Save</v-btn>
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
  name: 'CreateLandlord',
  mixins: [validators],
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
      return !!(this.isEmail(this.email) && this.isValidString(this.firstname)
      && this.isValidString(this.lastname));
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
        first_name: this.firstname.toUpperCase(),
        last_name: this.lastname.toUpperCase(),
        contact: this.contact,
        email: this.email,
        create_new_land_lord: this.user.company_id,
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
