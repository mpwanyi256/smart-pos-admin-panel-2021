import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import sales from './sales';
import accounts from './accounts';
import menu from './menu';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    sales,
    accounts,
    menu,
  },
});
