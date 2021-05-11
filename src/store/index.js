import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import sales from './sales';
import accounts from './accounts';
import menu from './menu';
import inventory from './inventory';
import pos from './pos';
import reports from './reports';
import settings from './settings';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    sales,
    accounts,
    menu,
    inventory,
    pos,
    reports,
    settings,
  },
});
