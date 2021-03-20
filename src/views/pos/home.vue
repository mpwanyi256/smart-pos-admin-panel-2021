<template>
    <div class="pos_home">
        <NavBar />
        <div class="sales_view">
            <Orders />
            <MenuSection />
            <SelectedOrder />
            <Actions />
        </div>
    </div>
</template>
<script>
import NavBar from '@/components/nav/Navbar.vue';
import Orders from '@/views/pos/Orders.vue';
import MenuSection from '@/views/pos/MenuSection.vue';
import Actions from '@/views/pos/Actions.vue';
import SelectedOrder from '@/views/pos/SelectedOrder.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'SmartSalesHome',
  components: {
    NavBar,
    Orders,
    MenuSection,
    Actions,
    SelectedOrder,
  },
  computed: {
    ...mapGetters('auth', ['user']),
  },
  data() {
    return {
      dayOpenPoll: null,
    };
  },
  created() {
    const setPolling = () => {
      if (!this.user) {
        clearInterval(this.polling);
      } else {
        this.getDayOpen(this.user.company_id);
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
@import '@/styles/pos.scss';

    .pos_home {
        height: 100vh;
        width: 100vw;
        overflow: hidden;
        background-color: $bg_color;
        font-size: 14px;
        font-family: $font-style;
        scrollbar-width: thin;
        ::-webkit-scrollbar{
          width: 8px;
        }

        ::-webkit-scrollbar-thumb {
            background: $scrollbar-color;
            border-radius: 1ex;
            -webkit-border-radius: 1ex;
            -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
            box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
        }

        ::-webkit-scrollbar-corner {
            background: #000;
        }

        .sales_view {
            height: calc(100vh - 52px);
            display: grid;
            grid-template-columns: 15% 50% 25% 10%;

            >div {
                height: calc(100vh - 52px);
                width: 100%;
            }
        }
    }
</style>
