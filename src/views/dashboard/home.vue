<template>
  <div class="dashboard">
    <div>
      <NavBar />
    </div>
    <div div class="smart_pane">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/nav/Navbar.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'home',
  components: {
    NavBar,
  },
  data() {
    return {
      dayOpenPoll: null,
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),
  },
  created() {
    const setPolling = () => {
      if (!this.user) {
        clearInterval(this.polling);
      } else {
        this.getDayOpen(11);
      }
    };
    this.polling = setInterval(() => {
      setPolling();
    }, 3000);
  },
  methods: {
    ...mapActions('auth', ['getDayOpen']),
  },

};
</script>
<style scoped lang="scss">
@import '../../styles/constants.scss';

.dashboard {
  width: 100vw !important;
  height: 100vh;
  margin: 0;
  background-color: $body-bg;
  display: inline-flex;
  flex-direction: column;
  font-family: $font-style !important;

  ::-webkit-scrollbar{
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
      background: #696969;
      border-radius: 1ex;
      -webkit-border-radius: 1ex;
      -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
  }

  ::-webkit-scrollbar-corner {
      background: #000;
  }

  .smart_pane {
    overflow: hidden;
    top: 0;
    bottom: 0;
    height: calc(100vh - 52px);
  }
}
</style>
