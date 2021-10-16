<template>
  <v-app>
    <router-view></router-view>
    <v-snackbar
      v-model="snackbar" top
    >
      {{ snackMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      polling: null,
      snackMessage: '',
      snackbar: false,
    };
  },
  computed: {
    ...mapGetters('auth', ['user', 'company']),
  },
  watch: {
    user(val) {
      if (val && val.company_id) {
        this.getFirebaseInfo();
        this.togglePolling();
      }
    },
  },
  async created() {
    if (this.user && this.user.company_info) {
      await this.getActiveLicense(this.user.company_info.company_email);
      await this.getFirebaseInfo();
      this.togglePolling();
    }
  },
  beforeDestroy() {
    clearInterval(this.polling);
  },

  eventBusCallbacks: {
    'show-snackbar': 'showSnackBar',
  },

  methods: {
    ...mapActions('auth', ['getDayOpen', 'getActiveLicense', 'getFirebaseInfo']),

    showSnackBar(message) {
      this.snackMessage = message;
      this.snackbar = true;
    },

    togglePolling() {
      const setPolling = () => {
        if (!this.user) {
          clearInterval(this.polling);
        } else {
          this.getDayOpen(this.user.company_id);
        }
      };
      this.polling = setInterval(() => {
        setPolling();
      }, 3000);
    },
  },
};
</script>
<style scoped lang="scss">
@import 'styles/main.scss';
</style>
