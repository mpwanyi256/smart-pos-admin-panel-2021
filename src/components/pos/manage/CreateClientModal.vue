<template>
    <Basemodal
      :title="`Create new client`"
      :size="1020" @close="$emit('close')">
      <div class="manager_actions">
          <div class="actions_list">
            <div class="frm_entry">
                <div>
                    <label>First name</label>
                    <div>
                        <BaseTextfield
                            v-model="firstname"
                            :preset="firstname"
                            placeholder="First name"
                        />
                    </div>
                </div><div>
                    <label>Last name</label>
                    <BaseTextfield
                        v-model="lastname"
                        :preset="lastname"
                        placeholder="Last name"
                    />
                </div>
            </div>
            <div class="frm_entry">
                <div>
                    <label>Address</label>
                    <BaseTextfield
                    v-model="address"
                    :preset="address"
                    placeholder="Address"
                    />
                </div><div>
                    <label>Email address</label>
                    <BaseTextfield
                        v-model="email"
                        :preset="email"
                        placeholder="email"
                    />
                </div>
            </div>
            <div class="frm_entry">
                <div>
                    <label>Contact number</label>
                    <BaseTextfield
                        v-model="contactNumber"
                        :preset="contactNumber"
                        placeholder="+256780101601"
                    />
                </div>
                <div>
                    <div>
                    <v-btn
                        :disabled="!isValid"
                        class="mt-8 float-right"
                        @click="saveClient"
                    >
                        Save
                    </v-btn>
                    </div>
                </div>
            </div>
            <div class="frm_entry">
            </div>
          </div>
      </div>
    </Basemodal>
</template>
<script>
import Basemodal from '@/components/generics/Basemodal.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import { mapActions, mapGetters } from 'vuex';
import validators from '@/mixins/validators';

export default {
  name: 'CreateClientMOdal',
  mixins: [validators],
  props: {
  },
  components: {
    Basemodal,
    BaseTextfield,
  },
  data() {
    return {
      loading: false,
      message: '',
      firstname: '',
      lastname: '',
      address: '',
      email: '',
      contactNumber: '',
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
      return !!(this.firstname.length && this.lastname.length
        && this.address.length && this.email.length && this.contactNumber.length);
    },

    isEmailAddress() {
      return this.isEmail(this.email);
    },
  },
  created() {
  },
  methods: {
    ...mapActions('settings', ['post']),

    saveClient() {
      const info = {
        firstname: this.firstname,
        lastname: this.lastname,
        address: this.address,
        email: this.email,
        contact_number: this.contactNumber,
        company_id: this.user.company_id,
        create_new_client: true,
      };
      this.post(info)
        .then((res) => {
          console.log('Response', res);
        }).catch((e) => {
          console.error('Error', e);
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
  min-height: 400px;
  color: $black;
  padding: 15px;

  .actions_list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 15px;

        .frm_entry {
            display: grid;
            grid-template-columns: 50% 50%;
            gap: 15px;
            padding: 0;
            top: 0;
            bottom: 0;

            >div {
                display: flex;
                flex-direction: column;
                gap: 15px;

                .known_client {
                    color: $white;
                    font-weight: bold;
                    padding: 10px;
                    background-color: $green;
                    cursor: pointer;
                    margin: 10px;
                    border-radius: 5px;
                }
            }
        }

    }

  }

</style>
