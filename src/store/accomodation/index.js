import API from '@/api';

const PATH = 'accomodation/';

export default {
  namespaced: true,
  state: {
    loading: false,
  },
  mutations: {
    loading(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    post({ commit }, payload) {
      const comapnyId = localStorage.getItem('smart_company_id');
      commit('loading', true);
      const params = new FormData();
      params.append('company_id', comapnyId);
      const updateKeys = Object.keys(payload);
      updateKeys.forEach((key) => {
        params.append(key, payload[`${key}`]);
      });
      commit('loading', false);
      return API.smart(PATH, params);
    },
  },
  getters: {},
};
