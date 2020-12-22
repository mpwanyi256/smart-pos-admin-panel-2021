import { mapActions } from 'vuex';

export default {
  name: 'RoutingMixin',
  props: {
    links: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    // ...mapGetters('auth', ['user']),
    activeRoute() {
      return this.$route.name;
    },
    // screenWidth() {
    //   // eslint-disable-next-line no-restricted-globals
    //   return (window.innerWidth > 0) ? window.innerWidth : screen.width;
    // },
  },
  methods: {
    ...mapActions('auth', ['performLogout']),
    gotTopage(route) {
      this.$router.push({ name: route.path });
    },
  },
};
