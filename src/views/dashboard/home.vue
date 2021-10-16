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
<style scoped lang="scss">
@import '../../styles/constants.scss';

.dashboard {
  width: 100vw !important;
  height: 100vh;
  margin: 0;
  background-color: $body-bg;
  display: inline-flex;
  flex-direction: column;
  font-family: $font-style !important;
  overflow-y: hidden;

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

  .smart_pane {
    overflow: hidden;
    top: 0;
    bottom: 0;
    height: calc(100vh - 52px);
    overflow: hidden;
  }
}
</style>
