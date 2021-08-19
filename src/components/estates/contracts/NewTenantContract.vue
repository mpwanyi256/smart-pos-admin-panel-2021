<template>
    <div class="new_contract">
        <div>
            <LinearLoader v-if="loading" />
        </div>
        <h4 class="grey--text">
            Client details
        </h4>
        <div class="tenant_contract">
            <div class="frm_entry">
                <label>First name</label>
                <BaseTextfield v-model="firstName" placeholder="First name" />
            </div>
            <div class="frm_entry">
                <label>Last name</label>
                <BaseTextfield v-model="lastName" placeholder="Last name" />
            </div>
            <div class="frm_entry">
                <label>Address</label>
                <BaseTextfield v-model="address" placeholder="Address" />
            </div>
            <div class="frm_entry">
                <label>Email</label>
                <BaseTextfield v-model="email" placeholder="Email address" />
            </div>
            <div class="frm_entry">
                <label>Contact</label>
                <BaseTextfield v-model="contactNumber" placeholder="Contact number" />
            </div>
            <div class="frm_entry">
                <label>Tin number</label>
                <BaseTextfield v-model="tinNumber" placeholder="Tin number" />
            </div>
        </div>
        <h4 class="grey--text">
            Property details
        </h4>
        <div class="tenant_contract">
            <div class="frm_entry">
                <label>Property</label>
                <v-select
                    outlined dense
                    :items="properties"
                    item-text="name"
                    item-value="id"
                    label="Select property"
                    v-model="propertyId"
                />
            </div>
            <div class="frm_entry">
                <label>Available Rooms</label>
                <v-select
                    outlined dense
                    :items="selectedPropertyUnits"
                    item-text="unit_name"
                    item-value="unit_id"
                    label="Select room"
                    v-model="roomId"
                />
            </div>
            <div class="frm_entry">
                <label>Agreed monthly rent</label>
                <BaseTextfield v-model="agreedRent" :preset="agreedRent"
                inputType="number" placeholder="Monthly rent agreed" />
            </div>
            <div class="frm_entry">
                <label>Check in date</label>
                <DatePickerBeta
                    message="Check in date"
                    @picked="checkInDate = $event"
                />
            </div>
        </div>
        <div class="tenant_contract">
            <div>
                {{ errorMessage ? errorMessage : ' ' }}
            </div>
            <div>
                <v-btn class="float-right primary" dark
                    @click="createContract"
                    :disabled="!isValid"
                >
                    Create contract
                </v-btn>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import DatePickerBeta from '@/components/generics/DatePickerBeta.vue';
import LinearLoader from '@/components/generics/Loading.vue';

export default {
  name: 'NewTenantContract',
  components: {
    BaseTextfield,
    DatePickerBeta,
    LinearLoader,
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      contactNumber: '',
      tinNumber: '',
      propertyId: 0,
      roomId: 0,
      agreedRent: '',
      checkInDate: '',
      properties: [],
      units: [],
      errorMessage: '',
      loading: true,
    };
  },
  created() {
    this.$nextTick(async () => {
      this.loading = true;
      await this.fetchProperties();
      await this.fetchUnits();
      this.loading = false;
    });
  },
  computed: {
    ...mapGetters('auth', ['user']),

    selectedPropertyUnits() {
      return this.units.filter((unit) => unit.property_id === this.propertyId && !unit.is_occupied);
    },

    selectedRoom() {
      return this.units.find((unit) => unit.unit_id === this.roomId);
    },

    isValid() {
      return !!(this.roomId > 0 && this.firstName.length > 2 && this.lastName.length > 2
      && parseInt(this.agreedRent, 10) > 0 && this.email.length > 2 && this.selectedRoom);
    },
  },
  watch: {
    propertyId() {
      this.roomId = 0;
    },
    selectedRoom: {
      handler(unit) {
        if (unit) {
          this.agreedRent = unit.rate_charged;
        }
      },
      deep: true,
    },
    errorMessage(val) {
      if (val) {
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      }
    },
  },
  methods: {
    ...mapActions('estates', ['post']),

    async createContract() {
      await this.createClient();
    },

    async createClient() {
      try {
        this.loading = true;
        const info = {
          firstname: this.firstName,
          lastname: this.lastName,
          address: this.address,
          email: this.email,
          contact_number: this.contactNumber,
          company_id: this.user.company_id,
          create_new_client: true,
          tin: this.tinNumber,
        };
        const CLIENT = await this.$store.dispatch('settings/post', info);
        if (CLIENT.exists) {
          const contractDetails = {
            client_id: CLIENT.client_id,
            property_id: this.propertyId,
            unit_id: this.roomId,
            rent_agreed: this.agreedRent,
            checkin_date: this.checkInDate,
            create_new_contract: true,
            payment_mode_id: 1,
            currency_id: this.selectedRoom.currency_id,
            company_id: this.user.company_id,
          };
          const CONTRACT = await this.post(contractDetails);
          this.errorMessage = CONTRACT.message;
          if (!CONTRACT.error) {
            setTimeout(() => {
              this.$emit('close');
            }, 2000);
          }
        } else {
          this.errorMessage = CLIENT.message;
        }
      } catch (e) {
        this.errorMessage = e;
      } finally {
        this.loading = false;
      }
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

    async fetchUnits() {
      const UNITS = await this.post({ fetch_units: 'all' }).catch(() => []);
      if (UNITS.data) this.units = UNITS.data;
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.new_contract {
    display: flex;
    flex-direction: column;
    // gap: 16px;

    h4 {
        margin-left: 16px;
        margin-top: 16px;
    }

    .tenant_contract {
        min-height: 100%;
        width: 100%;
        display: grid;
        grid-template-columns: 50% 50%;
        gap: 10px;
        padding: 16px;

        > div {
            display: flex;
            flex-direction: column;
            gap: 10px;
            // align-items: center;
            text-align: left;

            .input_entry {
                width: 100%;
            }
        }
    }

}

</style>
