<template>
    <Basemodal
      :title="`Update ${unit.unit_name}`"
      :size="600" @close="$emit('close')">
        <div v-if="loading" class="loading_data">
            <LoadingSpinner class="large" />
        </div>
        <div v-else class="create_landlord">
          <label>Unit name</label>
          <BaseTextfield v-model="unit.unit_name"
            :preset="unit.unit_name" placeholder="Unit name" />
            <label>Monthly rate</label>
            <BaseTextfield
                v-model="unit.rate_charged"
                :preset="unit.rate_charged"
                inputType="number"
                placeholder="Monthly rate"
            />
            <label>Currency</label>
            <v-select
                outlined dense
                :items="currencies"
                v-model="unit.currency_id"
                item-value="id"
                item-text="name"
            />
          <label>Property</label>
          <v-select
                outlined dense
                :items="properties"
                item-text="name"
                item-value="id"
                v-model="unit.property_id"
            />
          <label>Landlord</label>
            <v-select
                outlined dense
                :items="landlords"
                item-text="first_name"
                item-value="id"
                v-model="unit.landlord_id"
            />
          <div class="sbmt_btn mt-4">
            <v-btn :disabled="loading" block @click="updateUnit">Save</v-btn>
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
import LoadingSpinner from '@/components/generics/LoadingSpinner.vue';

export default {
  name: 'UpdateUnitModal',
  mixins: [validators],
  props: {
    unit: {
      type: Object,
      required: true,
    },
  },
  components: {
    Basemodal,
    BaseTextfield,
    LoadingSpinner,
  },
  data() {
    return {
      landlordId: 0,
      propertyId: 0,
      unitName: '',
      errorMessage: '',
      loading: true,
      landlords: [],
      properties: [],
      currencies: [],
      price: '',
      currency: '',
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),
  },
  watch: {
    errorMessage(val) {
      if (val) {
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    },
  },
  created() {
    this.$nextTick(async () => {
      this.loading = true;
      await this.fetchProperties();
      await this.fetchLandlords();
      await this.getCurrencies();
      this.loading = false;
    });
  },
  methods: {
    ...mapActions('estates', ['post']),

    async getCurrencies() {
      const CURRENCIES = await this.post({ get_currencies: 'all' }).catch(() => null);
      if (CURRENCIES) this.currencies = CURRENCIES.data;
    },

    async fetchProperties() {
      const PROPERTIES = await this.post({
        get_properties: 'all',
      }).catch((e) => {
        console.info('Error fetching properties', e);
        return null;
      });

      if (PROPERTIES && !PROPERTIES.error) this.properties = PROPERTIES.data;
    },

    async fetchLandlords() {
      const LANDLORDS = await this.post({ fetch_landlords: 'all' }).catch(() => []);
      if (LANDLORDS.data) this.landlords = LANDLORDS.data;
    },

    async updateUnit() {
      this.loading = true;
      const params = {
        ...this.unit,
        update_unit_info: this.unit.id,
      };
      const UNIT = await this.post(params);
      if (!UNIT.error) this.$emit('reload');
      else this.errorMessage = UNIT.error_message;
      this.loading = false;
    },
  },
};
</script>
<style scoped lang="scss">
  .create_landlord {
    min-height: 300px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 16px;

    v-deep v-select {
        top: 0;
        margin: 0;
    }
  }

  .loading_data {
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
