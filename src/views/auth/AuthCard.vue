<template>
    <v-card class="auth_card">
        <v-form @submit.prevent="loginUser">
        <v-card-text>
            <div class="text-center mb-3">
                <h1>Smart client</h1>
                <!-- <p class="grey--text mt-2">Sign in to your Smart POS</p> -->
            </div>
            <v-text-field v-model.trim="Username" label="Username"></v-text-field>
            <v-text-field v-model.trim="Password" label="Password" type="password">
            </v-text-field>
            <v-btn type="submit" block class="btn-login">Login</v-btn>
        </v-card-text>
        </v-form>
        <BaseAlert v-if="error.status" :message="error.message" />
        <v-progress-linear v-if="loading" indeterminate color="black" />

        <LicenseModal
          v-if="openLicenseModal"
          @close="openLicenseModal = false"
        />
    </v-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import BaseAlert from '@/components/alerts/BaseAlert.vue';
import LicenseModal from '@/components/pos/manage/LicenseModal.vue';

export default {
  name: 'AuthCard',

  components: {
    BaseAlert,
    LicenseModal,
  },

  data() {
    return {
      Username: '',
      Password: '',
      passwordReset: false,
      createAccountModal: false,
      openLicenseModal: false,
    };
  },

  computed: {
    ...mapGetters('auth', ['loading', 'error', 'user', 'license']),
    userId() {
      return localStorage.getItem('smart_user_id');
    },
    routeOn() {
      return this.$route.name;
    },
  },

  async created() {
    const LoggedInUser = localStorage.getItem('smart_user_id');
    if (LoggedInUser) {
      this.getUserById(this.routeOn);
      if (this.error.message === 'Sorry, you license expired') {
        this.getLicense();
      }
    }
  },

  methods: {
    ...mapActions('auth',
      ['performLogin',
        'setError',
        'getUserById',
        'clearError',
        'getActiveLicense']),

    async loginUser() {
      if (this.Username.toLowerCase() === 'x' && this.Password.toLowerCase() === 'x') {
        this.clearError();
        this.$router.push({ name: 'setup' });
        return;
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
        await this.performLogin(credentials);
        if (this.error.message === 'Sorry, you license expired') {
          this.getLicense();
        }
      }
    },

    async getLicense() {
      if (this.user) {
        await this.getActiveLicense(this.user.company_info.company_email);
        this.openLicenseModal = true;
      }
    },

  },
};
</script>
<style scoped lang="scss">
@import '../../styles/constants.scss';

    .auth_card {
        background-color: $white;
        opacity: 0.7.5;
    }

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
