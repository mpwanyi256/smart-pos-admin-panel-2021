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
import { mapGetters } from 'vuex';
import SalesPanel from '@/views/dashboard/sales/SalesPanel.vue';

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
  mounted() {
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/pos.scss';

    .sales {
      height: calc(100vh - 52px);
      width: 100%;
      display: grid;

      ::-webkit-scrollbar{
          width: 5px;
          height: 5px;
        }

        ::-webkit-scrollbar-thumb {
            background: $scrollbar-color;
            border-radius: 1ex;
            -webkit-border-radius: 1ex;
        }

        ::-webkit-scrollbar-corner {
            background: #000;
        }

      @media only screen and (min-width: 1600px) {
        grid-template-columns: 20% 80%;
      }

      @media only screen and (max-width: 1600px) {
        grid-template-columns: 30% 70%;
      }

      .sales_pane {
        height: 100%;
        overflow-y: hidden;
      }

      .dashboard_pane {
        overflow-y: auto;
        overflow-x: hidden;
      }

    }
</style>
