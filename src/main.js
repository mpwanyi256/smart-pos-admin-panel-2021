import axios from 'axios';
import Vue from 'vue';
import fbConf from '@/fbConfig';
import firebase from 'firebase/app';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './styles/main.scss';
import eventBus from './plugins/event-bus';
import EventBusCallbacks from './plugins/Eventbus';

import 'firebase/firebase-analytics';
import 'firebase/firestore';

// Api server address set
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

Vue.use(EventBusCallbacks, eventBus);

Vue.prototype.$eventBus = eventBus;

new Vue({
  router,
  store,
  vuetify,
  created() {
    const LoggedInUser = localStorage.getItem('smart_user_id');
    if (LoggedInUser) {
      store.dispatch('auth/getUserById');
      store.dispatch('settings/fetch', { get_access_controls: 'all' });
      // initialize firebase
      firebase.initializeApp(fbConf);
      firebase.firestore().settings({
        cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
      });

      firebase.analytics();
      firebase.firestore().enablePersistence();
      firebase.firestore().collection('licenses')
        .onSnapshot(async () => {
          const compEmail = localStorage.getItem('smart_company_email');
          if (compEmail) await store.dispatch('auth/getActiveLicense', compEmail);
          if (compEmail === 'prodevgroup256@gmail.com') await store.dispatch('manage/fetchClientLicenses');
        });
      firebase.firestore().collection('Companies')
        .onSnapshot(async () => {
          const compEmail = localStorage.getItem('smart_company_email');
          if (compEmail === 'prodevgroup256@gmail.com') await store.dispatch('manage/fetchClients', compEmail);
        });
    } else store.replace({ name: 'login' });
  },
  render: (h) => h(App),
}).$mount('#app');
