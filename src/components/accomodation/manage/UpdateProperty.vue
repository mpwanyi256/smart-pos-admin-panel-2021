<template>
    <Basemodal
      :title="property.name"
      :size="700" @close="$emit('close')">
      <div class="manager_actions">
          <div class="actions_list">
            <div class="frm_entry">
                <label>Property name</label>
                <BaseTextfield
                  v-model="property.name"
                  :preset="property.name"
                  placeholder="Property name"
                />
            </div>
            <div class="frm_entry">
                <label>Address</label>
                <BaseTextfield
                  v-model="property.address"
                  :preset="property.address"
                  placeholder="Property address"
                />
            </div>
            <div class="frm_entry">
                <label>{{ message }}</label>
                <div>
                    <v-btn
                        :disabled="!isValid"
                        class="float-right primary"
                        dark
                        @click="addProperty"
                    >
                        Save
                    </v-btn>
                </div>
            </div>
          </div>
      </div>
    </Basemodal>
</template>
<script>
import { mapActions } from 'vuex';
import Basemodal from '@/components/generics/Basemodal.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';

export default {
  name: 'UpdateProperty',
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
      address: '',
      loading: false,
      message: '',
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
    isValid() {
      return !!this.property.name.length && this.property.address.length;
    },
  },
  methods: {
    ...mapActions('accomodation', ['post']),

    addProperty() {
      this.loading = true;
      this.post({
        update_property: this.property.id,
        property_name: this.property.name.toUpperCase(),
        address: this.property.address.toUpperCase(),
      }).then((response) => {
        this.$emit('reload');
        if (!response.error) this.$emit('close');
        this.message = response.error_message;
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
  height: 200px;
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
