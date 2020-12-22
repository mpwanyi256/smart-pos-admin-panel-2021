<template>
    <div class="sales">
        <div>
            <SalesPanel v-if="user" :user="user" />
        </div>
        <div>
          <SalesOverview />
        </div>
    </div>
</template>
<script>
import SalesPanel from '@/views/dashboard/sales/SalesPanel.vue';
import SalesOverview from '@/views/dashboard/sales/reports/salesOverview.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Sales',
  components: {
    SalesPanel,
    SalesOverview,
  },
  computed: {
    ...mapGetters('auth', ['user']),
  },
  methods: {
    ...mapActions('sales', ['getOrders']),
  },
  mounted() {
    this.getOrders();
  },
};
</script>
<style scoped>
    .sales {
      margin-top: 50px;
      height: 100vh;
      width: 100%;
      display: grid;
      grid-template-columns: 30% 70%;
    }
</style>
