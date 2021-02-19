<template>
  <div class="dashboard">
    <div>
      <NavBar />
    </div>
    <div div class="smart_pane">
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
  width: 100%;
  height: 100%;
  background-color: $body-bg;
  display: inline-flex;
  flex-direction: column;

  // .smart_pane {
  //   min-height: calc(100vh - 52px);
  //   width: 100vw;
  // }
}
</style>
