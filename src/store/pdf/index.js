import API from '@/api';

const PATH = 'pdf/report/';
const BOOKING_PATH = 'pdf/booking/';

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
    generatePdf({ commit }, payload) {
      const companyId = localStorage.getItem('smart_company_id');
      commit('loading', true);
      const params = new FormData();
      const updateKeys = Object.keys(payload);
      updateKeys.forEach((key) => {
        params.append(key, payload[key]);
      });
      params.append('company_id', companyId);
      commit('loading', false);
      return API.smart(PATH, params);
    },

    generateBookingPdf({ commit }, payload) {
      const companyId = localStorage.getItem('smart_company_id');
      commit('loading', true);
      const params = new FormData();
      const updateKeys = Object.keys(payload);
      updateKeys.forEach((key) => {
        params.append(key, payload[key]);
      });
      params.append('company_id', companyId);
      commit('loading', false);
      return API.smart(BOOKING_PATH, params);
    },
  },
};
