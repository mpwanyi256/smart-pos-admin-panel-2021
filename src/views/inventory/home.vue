<template>
  <div class="dashboard">
    <div>
      <NavBar />
    </div>
    <div div class="inv_pave">
      <div class="link_pane">
        <SalesNavBar :title="'Inventory'" :links="links" />
      </div>
      <div class="link_views">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import NavBar from '@/components/nav/Navbar.vue';
import SalesNavBar from '@/components/nav/SalesNavBar.vue';

export default {
  name: 'Inventoryhome',
  components: {
    SalesNavBar,
    NavBar,
  },
  data() {
    return {
      links: [
        { name: 'Inventory', icon: 'mdi-home', path: 'inv_dashboard' },
        { name: 'Purchase Items', icon: 'mdi-cart', path: 'inv_storeItems' },
        { name: 'Menu Receipes', icon: 'mdi-google-circles', path: 'inv_recipes' },
        { name: 'Suppliers', icon: 'mdi-account-multiple', path: 'inv_suppliers' },
        { name: 'Purchase Invoices', icon: 'mdi-animation', path: 'inv_purchases' },
        { name: 'Supplier Payments', icon: 'mdi-contactless-payment-circle', path: 'inv_supplier_payments' },
        { name: 'Supplier Statements', icon: 'mdi-book-open', path: 'inv_supplier_statements' },
      ],
    };
  },
  computed: {
    ...mapGetters('auth', ['user']),
  },

};
</script>
<style scoped lang="scss">
@import '../../styles/constants.scss';

.dashboard {
  width: 100vw;
  height: 100vh;
  margin: 0;
  background-color: $body-bg;
  display: flex;
  flex-direction: column;
  font-family: $font-style !important;

  ::-webkit-scrollbar{
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
      background: #696969;
      border-radius: 1ex;
      -webkit-border-radius: 1ex;
  }

  ::-webkit-scrollbar-corner {
      background: #000;
  }

  .inv_pave {
    overflow: hidden;
    top: 0;
    bottom: 0;
    height: calc(100vh - 52px);
    display: grid;

    @media only screen and (max-width: 1200px) {
      grid-template-columns: 20% 80%;
    }

    @media only screen and (min-width: 1600px) {
      grid-template-columns: 20% 80%;
    }

    @media only screen and (max-width: 1600px) {
      grid-template-columns: 30% 70%;
    }

    .link_views {
      background-color: $white;
      height: calc(100vh - 52px);
      overflow: auto;
    }
  }
}
</style>
