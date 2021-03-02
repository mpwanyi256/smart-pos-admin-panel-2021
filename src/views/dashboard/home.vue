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
  width: 100vw !important;
  height: 100vh;
  margin: 0;
  background-color: $body-bg;
  display: inline-flex;
  flex-direction: column;
  font-family: $font-style !important;

  .smart_pane {
    overflow: auto;
    padding-bottom: 15px;
    height: calc(100vh - 52px);
  }
}
</style>
