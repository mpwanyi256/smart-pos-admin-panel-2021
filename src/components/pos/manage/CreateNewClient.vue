<template>
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
                  :disabled="!isValid || !isEmailAddress"
                  class="mt-8 float-right"
                  @click="saveClient"
              >
                  Save
              </v-btn>
              </div>
          </div>
      </div>
        <div v-if="errorMessage"
            class="error_message text-center"
            :class="noticeType == 'error' ? 'error' : 'success'"
        >
            {{ errorMessage }}
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import BaseTextfield from '@/components/generics/BaseTextfield.vue';
import validators from '@/mixins/validators';

export default {
  name: 'CreateNewClient',
  mixins: [validators],
  components: {
    BaseTextfield,
  },
  data() {
    return {
      firstname: '',
      lastname: '',
      address: '',
      email: '',
      contactNumber: '',
      errorMessage: '',
      noticeType: 'error',
    };
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
  watch: {
    errorMessage() {
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    },
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
        tin: '',
      };
      this.post(info)
        .then((res) => {
          if (res.error) {
            this.noticeType = 'error';
            this.errorMessage = res.message;
          } else {
            this.noticeType = 'success';
            this.errorMessage = res.message;
            setTimeout(() => {
              this.$emit('add', res.client_id);
            }, 3000);
          }
        }).catch((e) => {
          console.error('Error', e);
        });
      this.$emit('reload');
    },

  },
};
</script>
<style scoped lang="scss">
@import '@/styles/constants.scss';

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

.actions_list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;

  .frm_entry {
      display: grid;
      grid-template-columns: 50% 50%;
      gap: 5px;
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
</style>
