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
      manageRoute: {
        icon: 'mdi-cart', name: 'Manage', path: 'manage_clients', allowedUsers: [],
      },
    };
  },
  computed: {
    ...mapGetters('auth', ['routes']),
    ...mapGetters('auth', ['user']),

    userRole() {
      return this.user ? this.user.role : 3;
    },

    filteredRoutes() {
      return this.routes.filter((Route) => Route.allowedUsers.includes(this.userRole));
    },

    companyInfo() {
      return this.user.company_info;
    },

    isProtectedManageAccount() {
      return this.companyInfo.company_email === 'prodevgroup256@gmail.com';
    },

    userName() {
      return this.user && this.user.user_name ? this.user.user_name.split(' ')[0] : '';
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
