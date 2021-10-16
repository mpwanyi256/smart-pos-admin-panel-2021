import { mapGetters } from 'vuex';

export default {
  name: 'ExternalLinkMixin',
  computed: {
    ...mapGetters('auth', ['user']),

    companyInfo() {
      return this.user.company_info;
    },

    serverIP() {
      const IPAddress = localStorage.getItem('smartpos_ipaddress_set');
      return IPAddress ? `http://${IPAddress}/papi/` : 'http://localhost:80/papi/';
    },
  },
  methods: {
    openExternalLink(path) {
      window.open(`${this.serverIP}${path}`, '_blank').focus();
    },
  },
};
