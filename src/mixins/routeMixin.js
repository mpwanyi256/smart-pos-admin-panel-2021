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
      return this.$route.name;
    },
  },
  methods: {
    ...mapActions('auth', ['performLogout']),
    gotTopage(route) {
      this.$router.push({ name: route.path });
    },
  },
};
