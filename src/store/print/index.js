import API from '@/api';

const BILL = 'print/';

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
    sendPrintJob({ commit }, payload) {
      commit('loading', true);
      const params = new FormData();
      const updateKeys = Object.keys(payload);
      updateKeys.forEach((key) => {
        params.append(key, payload[`${key}`]);
      });
      commit('loading', false);
      return API.smart(BILL, params);
    },
  },
};
