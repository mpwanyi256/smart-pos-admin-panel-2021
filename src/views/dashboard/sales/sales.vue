<template>
    <div class="sales">
        <div>
            <SalesPanel class="dashboard_pane" v-if="user" :user="user" />
        </div>
        <div class="sales_pane">
          <router-view></router-view>
        </div>
    </div>
</template>
<script>
import SalesPanel from '@/views/dashboard/sales/SalesPanel.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Sales',
  components: {
    SalesPanel,
  },
  data() {
    return {
      polling: null,
      loading: false,
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),
    routePath() {
      return this.$route.name;
    },
  },
  methods: {
    ...mapActions('sales', ['getOrders']),
  },
  mounted() {
    window.scroll(0, 0);
    const setPolling = () => {
      if (!this.user) {
        clearInterval(this.polling);
      } else {
        this.getOrders();
      }
    };
    this.polling = setInterval(() => {
      setPolling();
    }, 3000);
  },
};
</script>
<style scoped lang="scss">
    .sales {
      height: calc(100vh - 52px);
      width: 100%;
      display: grid;
      @media only screen and (min-width: 1600px) {
        grid-template-columns: 20% 80%;
      }

      @media only screen and (max-width: 1600px) {
        grid-template-columns: 30% 70%;
      }

      .sales_pane {
        height: 100%;
        overflow-y: auto;
      }

      .dashboard_pane {
        overflow-y: auto;
        overflow-x: hidden;
      }

    }
</style>
