<template>
  <div class="dashboard">
    <NavBar />
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
};
</script>
<style lang="scss">
@import '../../styles/constants.scss';

.dashboard {
  width: 100vw;
  height: 100vh;
  background-color: $body-bg;
  display: flex;
  flex-direction: column;
}
</style>
