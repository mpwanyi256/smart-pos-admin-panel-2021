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
