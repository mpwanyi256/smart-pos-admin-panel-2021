import Vue from 'vue';
import VueRouter from 'vue-router';
import Meta from 'vue-meta';
import auth from './auth';
import error from './error';
import home from './home';
import setup from './setup';
import inventory from './inventory';
import Accounting from './accounting';
import POS from './pos';

Vue.use(VueRouter);
Vue.use(Meta, {
  refreshOnceOnNavigation: true,
});

const routes = [
  auth,
  error,
  home,
  Accounting,
  setup,
  inventory,
  POS,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition || from.meta.scrollToTop === false) {
      return savedPosition;
    } if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ selector: to.hash });
        }, 1000);
      });
    } if (to.path !== from.path) {
      return { x: 0, y: 0 };
    }
    return {};
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.length) {
    document.title = to.meta.title;
    next();
  } else {
    next();
    // eslint-disable-next-line no-restricted-globals
    // location.href = to.fullPath;
  }
});

export default router;
