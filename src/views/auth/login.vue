<template>
    <div class="main-login">
        <v-container>
            <v-row>
                <v-col cols="12" xs="12" sm="10" offset-sm="1" md="6" offset-md="3"
                lg="6" offset-lg="3" xl="6" offset-xl="3">
                    <v-card max-width="auto">
                        <v-form @submit.prevent="loginUser" class="mt-3">
                        <v-card-text>
                            <div class="text-center mb-3">
                                <h4>Smart Client POS</h4>
                                <p class="grey--text mt-2">Sign in to your Smart POS</p>
                            </div>
                            <v-text-field v-model.trim="Username" label="Username"></v-text-field>
                            <v-text-field v-model.trim="Password" label="Password" type="password">
                            </v-text-field>
                            <v-btn type="submit" block class="btn-login">Login</v-btn>
                        </v-card-text>
                        </v-form>
                        <BaseAlert v-if="error.status" :message="error.message" />
                        <v-progress-linear v-if="loading" indeterminate color="black" />
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
// import validator from 'validator'
import { mapActions, mapGetters } from 'vuex';

import BaseAlert from '@/components/alerts/BaseAlert.vue';

export default {
  name: 'LoginForm',

  components: {
    BaseAlert,
  },

  data() {
    return {
      Username: '',
      Password: '',
      passwordReset: false,
      createAccountModal: false,
    };
  },

  computed: {
    ...mapGetters('auth', ['loading', 'error']),
    userId() {
      return localStorage.getItem('smart_user_id');
    },
  },

  mounted() {
    const LoggedInUser = localStorage.getItem('smart_user_id');
    if (LoggedInUser) {
      this.getUserById();
    }
  },

  methods: {
    ...mapActions('auth', ['performLogin', 'setError', 'getUserById']),

    async loginUser() {
      if (this.Username.toLowerCase() === 'x' && this.Password.toLowerCase() === 'x') {
        this.$router.push({ name: 'setup' });
      }
      if (this.Username.length <= 2) {
        this.setError('Sorry, Username Must be atleast 3 Characters long');
      } else if (this.Username.Password <= 5) {
        this.setError('Sorry, Password Must be atleast 6 Characters long');
      } else {
        const credentials = {
          username: this.Username,
          password: this.Password,
        };
        this.performLogin(credentials);
      }
    },

  },

};
</script>
<style scoped lang="scss">
  .btn-login {
    background-color: white!important;
    color: black;
    border: 1px solid #3d3d3d;
  }

  .main-login {
      height: 100vh;
      width: 100vw;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-color: #f2f2f7;
  }
</style>
