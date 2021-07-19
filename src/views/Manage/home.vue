<template>
    <div class="manage_accounts">
      <NavBar />
      <div div class="inv_pave">
      <div class="link_pane">
        <SalesNavBar :title="'Accounts Management'" :links="links" />
      </div>
      <div class="link_views">
        <router-view></router-view>
      </div>
    </div>
    </div>
</template>
<script>
import NavBar from '@/components/nav/Navbar.vue';
import SalesNavBar from '@/components/nav/SalesNavBar.vue';

export default {
  name: 'Home',
  components: {
    NavBar,
    SalesNavBar,
  },
  data() {
    return {
      links: [
        { name: 'Clients', icon: 'mdi-user', path: 'manage_clients' },
        // { name: 'Licenses', icon: 'mdi-store', path: 'manage_licenses' },
        // { name: 'Menu Receipes', icon: 'mdi-google-circles', path: 'inv_recipes' },
        // { name: 'Suppliers', icon: 'mdi-account-multiple', path: 'inv_suppliers' },
        // { name: 'Purchase Invoices', icon: 'mdi-animation', path: 'inv_purchases' },
      ],
    };
  },
};
</script>
<style scoped lang="scss">
@import '../../styles/constants.scss';

.manage_accounts {
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
