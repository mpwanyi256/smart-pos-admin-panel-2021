<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      polling: null,
    };
  },
  computed: {
    ...mapGetters('auth', ['user', 'getActiveLicense']),
  },
  async created() {
    if (this.user && this.user.company_info) {
      await this.getActiveLicense(this.user.company_info.company_email);
    }
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
  beforeDestroy() {
    clearInterval(this.polling);
  },
  methods: {
    ...mapActions('auth', ['getDayOpen']),
  },
};
</script>
<style scoped lang="scss">
@import 'styles/main.scss';
</style>
