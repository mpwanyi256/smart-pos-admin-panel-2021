<template>
    <Basemodal
      :title="`Update client info`"
      :size="500" @close="$emit('close')">
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
                    </div>
                    <div>
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
                        <label>Tin number</label>
                        <BaseTextfield
                            v-model="tinNumber"
                            :preset="tinNumber"
                            placeholder="Tax identity number"
                        />
                    </div>
                </div>
                <div class="frm_entry">
                    <div>
                        <div>
                        <v-btn
                            :disabled="!isValid || !isEmailAddress"
                            class="mt-8 float-right"
                            @click="saveClient"
                        >
                            Save
                        </v-btn>
                        </div>
                    </div>
                    <div
                      v-if="errorMessage"
                        class="error_message text-center"
                        :class="noticeType == 'error' ? 'error' :
                        noticeType == 'success' ? 'success' : ''"
                    >
                        {{ errorMessage }}
                    </div>
                </div>
            </div>
    </Basemodal>
</template>
<script>
import { mapActions } from 'vuex';
import Basemodal from '@/components/generics/Basemodal.vue';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import validators from '@/mixins/validators';

export default {
  name: 'UpdateClientInfo',
  mixins: [validators],
  props: {
    client: {
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
      address: '',
      email: '',
      contactNumber: '',
      tinNumber: '',
      errorMessage: '',
      noticeType: '',
    };
  },
  computed: {
    isValid() {
      return !!(this.firstname && this.firstname.length && this.lastname && this.lastname.length
        && this.address && this.address.length && this.email && this.email.length
        && this.contactNumber && this.contactNumber.length);
    },

    isEmailAddress() {
      return this.isEmail(this.email);
    },
  },
  watch: {
    errorMessage() {
      setTimeout(() => {
        this.errorMessage = '';
        this.noticeType = '';
      }, 3000);
    },
  },
  created() {
    this.$nextTick(() => {
      this.firstname = this.client.first_name;
      this.lastname = this.client.last_name;
      this.address = this.client.address;
      this.email = this.client.email;
      this.contactNumber = this.client.contact;
      this.tinNumber = this.client.tin;
    });
  },
  methods: {
    ...mapActions('settings', ['post']),

    saveClient() {
      const info = {
        update_client_info: this.client.id,
        firstname: this.firstname,
        lastname: this.lastname,
        address: this.address,
        email: this.email,
        contact_number: this.contactNumber,
        tin: this.tinNumber,
      };
      this.post(info)
        .then((res) => {
          if (res.error) {
            this.noticeType = 'error';
            this.errorMessage = res.message;
            console.log('Error creating client', res.error_message);
          } else {
            this.noticeType = 'success';
            this.errorMessage = res.message;
            setTimeout(() => {
              this.$emit('reload');
            }, 100);
          }
        }).catch((e) => {
          console.error('Error', e);
        });
    },

  },
};
</script>
<style scoped lang="scss">
    @import '@/styles/constants.scss';

    .actions_list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 15px;

        .frm_entry {
            display: flex;
            flex-direction: column;
            // grid-template-columns: 50% 50%;
            gap: 10px;
            padding: 0;
            top: 0;
            bottom: 0;

            >div {
                display: flex;
                flex-direction: column;
                gap: 15px;
                // padding: 15px 8px;

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

    .error_message {
        width: 100%;
        font-size: 14px;
        text-align: center;
        display: inline-flex;
        justify-content: center;
        margin: 15px;
        padding: 10px;
        border-radius: 5px;
    }

    .error {
        border: 0.3px solid $red;
        color: $white;
    }

    .success {
        border: 0.3px solid $green;
        color: $white;
    }

</style>
