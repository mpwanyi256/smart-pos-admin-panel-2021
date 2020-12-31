import Vue from 'vue';
import VueRouter from 'vue-router';
import Meta from 'vue-meta';
import auth from './auth';
import home from './home';
import setup from './setup';
import Accounting from './accounting';

Vue.use(VueRouter);
Vue.use(Meta, {
  refreshOnceOnNavigation: true,
});

const routes = [
  auth,
  home,
  Accounting,
  setup,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
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
