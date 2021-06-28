import API from '@/api';

const PATH = 'kds/';

export default {
  namespaced: true,
  state: {
    loading: false,
  },
  mutations: {
    loading(state, loadState) {
      state.loading = loadState;
    },
  },
  actions: {
    queryKds({ commit }, payload) {
      commit('loading', true);
      const params = new FormData();
      const updateKeys = Object.keys(payload);
      updateKeys.forEach((key) => {
        params.append(key, payload[`${key}`]);
      });
      commit('loading', false);
      return API.smart(PATH, params);
    },
  },
  getters: {
    loading: (state) => state.loading,
  },
};
