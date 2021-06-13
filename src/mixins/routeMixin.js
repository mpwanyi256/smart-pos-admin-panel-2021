import { mapActions, mapGetters } from 'vuex';
import SalesNavBar from '@/components/nav/SalesNavBar.vue';

export default {
  name: 'RoutingMixin',
  components: {
    SalesNavBar,
  },

  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    ...mapGetters('auth', ['routes']),
    ...mapGetters('auth', ['user']),

    companyInfo() {
      return this.user.company_info;
    },

    userName() {
      return this.user ? this.user.user_name.split(' ')[0] : '';
    },

    activeRoute() {
      return this.$route.path;
    },
  },
  methods: {
    ...mapActions('auth', ['performLogout']),
    gotTopage(route) {
      this.$router.push({ name: route.path });
    },
    isActiveRoute(path) {
      const link = path.toLowerCase();
      return this.activeRoute.toLowerCase().split(`${link}`).length > 1;
    },
  },
};
