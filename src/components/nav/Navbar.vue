<template>
    <div class="nav">
    <div class="wrapper">
      <div class="nav-content">
        <div class="title">
          <v-app-bar-nav-icon class="toggle-btn" @click="$emit('drawer')" />
          Smart POS
        </div>
        <div class="menu">
          <div class="tray">
            <div
            :class="activeRoute === link.path ? 'active' : 'item'"
              v-for="(link, index) in links" :key="index"
              :to="{ name: link.path }"
              @click="gotTopage(link)">
              <v-icon small class="icon" left>
                {{ link.icon }}
              </v-icon>
              {{ link.name }}
            </div>
            <div class="auth" @click="performLogout()">
              <v-icon small class="icon" dark>
                mdi-lock
              </v-icon>
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RoutingMixin from '@/mixins/routeMixin';

export default {
  name: 'NavBar',
  mixins: [RoutingMixin],
};
</script>
<style scoped lang="scss">
@import '../../styles/nav/style.scss';
</style>
