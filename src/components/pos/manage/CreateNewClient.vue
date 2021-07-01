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
</template>
<script>
import BaseTextfield from '@/components/generics/BaseTextfield.vue';

export default {
  name: 'CreateNewClient',
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
    };
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
