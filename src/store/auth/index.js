/* eslint-disable consistent-return */
// import * as firebase from 'firebase'
import API from '@/api';
import router from '../../router';

const PATH = 'auth/';

export default {
  namespaced: true,
  state: {
    user: {},
    loading: false,
    error: { status: false, message: '' },
    routes: [
      { icon: 'mdi-cart', name: 'Pos', path: 'pos' },
      { icon: 'mdi-sale', name: 'Sales', path: 'overview' },
      // { icon: 'mdi-webhook', name: 'Cashbook Accounting', path: 'accountingDashboard' },
      { icon: 'mdi-shopping', name: 'Inventory', path: 'inv_dashboard' },
      // { icon: 'mdi-graph', name: 'Reports', path: 'reports' },
      { icon: 'mdi-home', name: 'Accomodation', path: 'accomodation_dashboard' },
      { icon: 'mdi-cog', name: 'Settings', path: 'access_controls' },
    ],
  },
  mutations: {
    setCompanyDay(state, dayOpen) {
      state.user.company_info.day_open = dayOpen.day;
      localStorage.setItem('smart_company_day_open', dayOpen.day);
      state.user.company_info.day_open_display = dayOpen.display;
    },
    setRoles(state, payload) {
      state.roles = payload;
    },
    setUsers(state, payload) {
      state.users = payload;
    },
    resetUser(state) {
      state.user = null;
    },
    toggleLoading(state, payload) {
      state.loading = payload;
    },
    seterror(state, payload) {
      state.error = { status: true, message: payload };
    },
    clearError(state) {
      state.error = { status: false, message: '' };
    },
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    setLoading({ commit }, payload) {
      commit('toggleLoading', payload);
    },
    setError({ commit }, payload) {
      commit('seterror', payload);
    },
    clearError({ commit }) {
      commit('clearError');
    },
    async performLogin({ dispatch, commit }, payload) {
      commit('toggleLoading', true);
      const params = new FormData();
      params.append('username', payload.username);
      params.append('password', payload.password);

      const authData = await API.smart(PATH, params);
      if (authData.error) {
        commit('toggleLoading', false);
        dispatch('setError', authData.message);
      } else {
        const userInfo = authData.data;
        localStorage.setItem('smart_user_id', userInfo.id);
        localStorage.setItem('smart_user_name', userInfo.user_name);
        localStorage.setItem('smart_user_role', userInfo.role);
        localStorage.setItem('smart_company_id', userInfo.company_info.company_id);
        localStorage.setItem('smart_company_day_open', userInfo.company_info.day_open);
        commit('setUser', userInfo);

        if (userInfo.role === 5) {
          router.push({ name: 'overview' });
          dispatch('settings/fetch', { get_access_controls: 'all' });
        } else if (userInfo.role === 1 || userInfo.role === 2 || userInfo.role === 3) {
          router.push({ name: 'pos' });
          dispatch('settings/fetch', { get_access_controls: 'all' });
        } else {
          dispatch('setError', 'Sorry, you have no access to this section');
          dispatch('performLogout');
        }
      }
      commit('toggleLoading', false);
    },
    async getUserById({ dispatch, commit }, payload = null) {
      const loggedinUser = localStorage.getItem('smart_user_id');
      if (!loggedinUser) {
        dispatch('setError', 'no login information found');
        return router.push({ name: 'login' });
      }

      commit('toggleLoading', true);
      const params = new FormData();
      params.append('auth_by_id', loggedinUser);
      const authData = await API.smart(PATH, params);
      if (authData.error) {
        dispatch('setError', authData.message);
        router.push({ name: 'login' });
      } else {
        const userInfo = authData.data;
        localStorage.setItem('smart_user_id', userInfo.id);
        localStorage.setItem('smart_user_name', userInfo.user_name);
        localStorage.setItem('smart_user_role', userInfo.role);
        localStorage.setItem('smart_company_id', userInfo.company_info.company_id);
        localStorage.setItem('smart_company_day_open', userInfo.company_info.day_open);
        commit('setUser', userInfo);

        if (userInfo.role === 5) {
          if (payload && payload.match('login')) router.push({ name: 'overview' });
        } else if (userInfo.role === 1 || userInfo.role === 2 || userInfo.role === 3) {
          router.push({ name: 'pos' });
        } else {
          dispatch('setError', 'Sorry, you have no access to this section');
          dispatch('performLogout');
        }
      }
      commit('toggleLoading', false);
    },
    performLogout({ commit }) {
      localStorage.removeItem('smart_user_id');
      localStorage.removeItem('smart_user_name');
      localStorage.removeItem('smart_user_role');
      localStorage.removeItem('smart_company_day_open');
      localStorage.removeItem('smart_company_id');
      commit('setUser', null);
      router.push({ name: 'login' });
    },
    async getDayOpen({ commit }, companyId) {
      const params = new FormData();
      params.append('day_open', companyId);
      const companyDay = await API.smart(PATH, params);
      commit('setCompanyDay', { day: companyDay.data, display: companyDay.day_display });
    },
  },
  getters: {
    error: (state) => state.error,
    loading: (state) => state.loading,
    user: (state) => state.user,
    routes: (state) => state.routes,
  },
};
