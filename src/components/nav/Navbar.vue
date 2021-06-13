<template>
    <div class="nav">
    <div class="wrapper">
      <div class="nav-content">
        <div class="title">
          <div class="menu_icons">
            <v-app-bar-nav-icon class="d-none d-sm-flex d-md-none"
              @click="drawer = true" />
            <p>Smart POS |
              <small class="user_name">
                {{ userName }} -
              <!-- <v-icon class="time_display">
                mdi-calendar
              </v-icon> -->
              {{ companyInfo.day_open_display }}
              </small>
            </p>
          </div>
        </div>
        <div class="menu">
          <div class="tray">
            <div
            :class="isActiveRoute(link.name) ? 'active' : 'item'"
              v-for="(link, index) in routes" :key="index"
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
   <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <SalesNavBar :title="'Quick links'" :links="routes">
        <template slot="logout">
          <div class="menu">
            <div class="tray">
              <div class="side_bar_auth" @click="performLogout()">
                <v-icon small class="icon" dark>
                  mdi-lock
                </v-icon>
                Logout
              </div>
            </div>
          </div>
        </template>
      </SalesNavBar>
   </v-navigation-drawer>
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
