<template>
    <Basemodal
      :title="`Create property`"
      :size="700" @close="$emit('close')">
      <div class="manager_actions">
          <div class="actions_list">
            <div class="frm_entry">
                <label>Property name</label>
                <BaseTextfield
                  v-model="name"
                  placeholder="Property name"
                />
            </div>
            <div class="frm_entry">
                <label>Address</label>
                <BaseTextfield
                  v-model="address"
                  placeholder="Property address"
                />
            </div>
            <div class="frm_entry">
                <label>{{ message }}</label>
                <div>
                    <v-btn
                        :disabled="!isValid"
                        class="float-right"
                        @click="addProperty"
                    >
                        Create property
                    </v-btn>
                </div>
            </div>
          </div>
      </div>
    </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CreateProperty',
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
    ...mapGetters('auth', ['user']),
    isValid() {
      return !!this.name.length && this.address.length;
    },
  },
  methods: {
    ...mapActions('accomodation', ['post']),

    addProperty() {
      this.loading = true;
      this.post({
        create_property: this.name.toUpperCase(),
        address: this.address.toUpperCase(),
        company_id: this.user.company_id,
      }).then((response) => {
        this.$emit('reload');
        if (!response.error) this.$emit('close');
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
