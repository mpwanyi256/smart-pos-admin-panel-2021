<template>
    <Basemodal
      :title="`Add new room to ${property.name.toLowerCase()}`"
      :size="700" @close="$emit('close')">
      <div class="manager_actions">
          <div class="actions_list">
            <div class="frm_entry">
                <label>Room name</label>
                <BaseTextfield
                  v-model="name"
                  placeholder="Unit name"
                />
            </div>
            <div class="frm_entry">
                <label>Daily Rate</label>
                <BaseTextfield
                  v-model="price"
                  inputType="number"
                  placeholder="Unit price"
                />
            </div>
            <div class="frm_entry">
                <label>Currency</label>
                <v-select
                  outlined dense
                  :items="currencies"
                  v-model="currency"
                  item-value="id"
                  item-text="name"
                />
            </div>
            <div class="frm_entry">
                <label>{{ message }}</label>
                <div>
                    <v-btn
                        :disabled="!isValid"
                        class="float-right"
                        @click="addRoom"
                    >
                        Create unit
                    </v-btn>
                </div>
            </div>
          </div>
      </div>
    </Basemodal>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import Basemodal from '@/components/generics/Basemodal.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';

export default {
  name: 'CreateNewUnit',
  props: {
    property: {
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
      name: '',
      price: '',
      loading: false,
      message: '',
      currencies: [],
      currency: '',
    };
  },
  watch: {
    message() {
      setTimeout(() => {
        this.message = '';
      }, 3000);
    },
  },
  computed: {
    ...mapGetters('auth', ['user']),

    isValid() {
      return !!(this.name.length && this.price.length && this.currency);
    },
  },
  created() {
    this.getCurrencies();
  },
  methods: {
    ...mapActions('accomodation', ['post']),

    getCurrencies() {
      this.post({
        get_currencies: 'all',
      }).then((response) => {
        this.currencies = response.data;
      });
    },

    addRoom() {
      this.loading = true;
      this.post({
        add_new_room: this.name.toUpperCase(),
        price: parseInt(this.price, 10),
        currency_id: this.currency,
        property_id: this.property.id,
      }).then((response) => {
        this.$emit('reload');
        // if (!response.error) this.$emit('close');
        this.message = response.message;
        this.loading = false;
      }).catch((e) => {
        console.log(e);
        this.loading = false;
      });
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

.manager_actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-height: 200px;
  color: $black;

  .actions_list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 15px;

        .frm_entry {
            display: grid;
            grid-template-columns: 30% 70%;
        }

    }

  }

</style>
