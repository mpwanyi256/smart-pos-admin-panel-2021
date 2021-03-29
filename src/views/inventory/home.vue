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
import NavBar from '@/components/nav/Navbar.vue';
import SalesNavBar from '@/components/nav/SalesNavBar.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Inventoryhome',
  components: {
    SalesNavBar,
    NavBar,
  },
  data() {
    return {
      links: [
        { name: 'Dashboard', icon: 'mdi-home', path: 'inv_dashboard' },
        { name: 'Store items', icon: 'mdi-store', path: 'inv_storeItems' },
        { name: 'Menu Recipes', icon: 'mdi-apple', path: 'inv_recipes' },
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

  .inv_pave {
    overflow: hidden;
    top: 0;
    bottom: 0;
    height: calc(100vh - 52px);
    display: grid;
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
