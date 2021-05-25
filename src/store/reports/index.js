import API from '@/api';

const PATH = 'reports/';

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
    getReport({ commit }, payload) {
      commit('loading', true);
      const params = new FormData();
      const updateKeys = Object.keys(payload);
      updateKeys.forEach((key) => {
        params.append(key, payload[`${key}`]);
      });
      commit('loading', false);
      return API.smart(PATH, params);
    },
    getPdf({ commit }, payload) {
      commit('loading', true);
      const params = new FormData();
      const updateKeys = Object.keys(payload.query);
      updateKeys.forEach((key) => {
        params.append(key, payload.query[`${key}`]);
      });
      commit('loading', false);
      return API.smart(payload.path, params);
    },
  },
  getters: {
    loading: (state) => state.loading,
  },
};
