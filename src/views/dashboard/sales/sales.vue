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
      height: inherit;
      width: inherit;
      display: grid;
      grid-template-columns: 30% 70%;
      // overflow: auto;

      .dashboard_pane {
        overflow-y: auto;
        overflow-x: hidden;
      }

    }
</style>
