import API from '@/api';

const PATH = 'settings/';
export default {
  namespaced: true,
  state: {
    loading: false,
    controls: [],
  },
  mutations: {
    loading(state, payload) {
      state.loading = payload;
    },
    setColtrols(state, payload) {
      state.controls = payload;
    },
  },
  actions: {
    async fetch({ commit }, payload) {
      commit('loading', true);
      const params = new FormData();
      const updateKeys = Object.keys(payload);
      updateKeys.forEach((key) => {
        params.append(key, payload[`${key}`]);
      });
      commit('loading', false);
      const conts = await API.smart(PATH, params);
      if (!conts.error) commit('setColtrols', conts.data);
    },
    async post({ commit }, payload) {
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
    controls: (state) => state.controls,
  },
};
