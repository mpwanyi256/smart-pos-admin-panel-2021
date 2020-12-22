import axios from 'axios';
import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './styles/main.scss';

// Api setup
axios.defaults.baseURL = 'http://localhost:80/papi/'; // 'http://192.168.0.101:80/papi/';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  created() {
    const LoggedInUser = localStorage.getItem('smart_user_id');
    if (LoggedInUser) {
      store.dispatch('auth/getUserById');
      // this.getUserById();
    }
  },
  render: (h) => h(App),
}).$mount('#app');
