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
  width: 100vw;
  height: 100vh;
  background-color: $body-bg;
  display: inline-flex;
  flex-direction: column;
  font-family: $font-style;

  .smart_pane {
    overflow-y: auto;
    overflow-x: hidden !important;
    padding-bottom: 15px;
    max-height: 1020px;
  }
}
</style>
