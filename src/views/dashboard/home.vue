<template>
  <div class="dashboard">
    <NavBar :links="routes" />
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/nav/Navbar.vue';

export default {
  name: 'home',
  components: {
    NavBar,
  },
  data: () => ({
    drawer: false,
    routes: [
      { icon: 'mdi-sale', name: 'Sales', path: 'sales' },
      { icon: 'mdi-webhook', name: 'Accounts', path: 'accounting' },
      { icon: 'mdi-shopping', name: 'Inventory', path: 'inventory' },
      { icon: 'mdi-home', name: 'Rooms', path: 'rooms' },
      { icon: 'mdi-graph', name: 'Reports', path: 'reports' },
      { icon: 'mdi-cog', name: 'Settings', path: 'settings' },
    ],
  }),
};
</script>
<style lang="scss">
@import '../../styles/constants.scss';

.dashboard {
  width: 100%;
  height: 100%;
  background-color: $body-bg;
}
</style>
