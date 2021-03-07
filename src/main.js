import axios from 'axios';
import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './styles/main.scss';

// Api setup
const IPAddress = localStorage.getItem('smartpos_ipaddress_set');
axios.defaults.baseURL = IPAddress ? `http://${IPAddress}/papi/` : 'http://localhost:80/papi/';
// axios.defaults.baseURL = 'http://localhost:80/papi/';
Vue.config.productionTip = false;

// eslint-disable-next-line consistent-return
router.beforeEach((to, from, next) => {
  const loggedUser = localStorage.getItem('smart_user_id');
  if (to.meta.authrequired && !loggedUser) {
    return next({ replace: true, name: 'login' });
  } if (to.meta.authrequired && loggedUser) {
    return next();
  } if (!to.meta.authrequired) {
    return next();
  } if (to.path === from.path) {
    return null;
  }
  next();
});

new Vue({
  router,
  store,
  vuetify,
  created() {
    const LoggedInUser = localStorage.getItem('smart_user_id');
    if (LoggedInUser) store.dispatch('auth/getUserById');
    else store.replace({ name: 'login' });
  },
  render: (h) => h(App),
}).$mount('#app');
