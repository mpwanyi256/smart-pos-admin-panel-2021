import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'RoutingMixin',

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
      return this.activeRoute.toLowerCase().split(`${link}/`).length > 1;
    },
  },
};
