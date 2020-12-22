import Vue from 'vue';
import VueRouter from 'vue-router';
import auth from './auth';
import home from './home';

Vue.use(VueRouter);

const routes = [
  auth,
  home,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
