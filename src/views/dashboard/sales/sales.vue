<template>
    <div class="sales">
        <div>
            <SalesPanel v-if="user" :user="user" />
        </div>
        <div>
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
<style scoped>
    .sales {
      margin-top: 52px;
      height: 100vh;
      width: 100%;
      display: grid;
      grid-template-columns: 30% 70%;
    }
</style>
