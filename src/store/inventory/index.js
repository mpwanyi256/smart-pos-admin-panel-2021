import API from '@/api';

const PATH = 'inventory/';

export default {
  namespaced: true,
  state: {
    storeItems: [],
    measures: [],
  },
  mutations: {
    setStoreItems(state, payload) {
      state.storeItems = payload;
    },
    setMeasures(state, payload) {
      state.measures = payload;
    },
  },
  actions: {
    async getStoreItems({ commit }, payload) {
      const params = new FormData();
      params.append('get_store_items', 'all');
      params.append('company_id', payload.company_id);
      const items = await API.smart(PATH, params);
      console.log(items);
      if (!items.error) commit('setStoreItems', items.data);
    },

    async getStoreMeasures({ commit }, payload) {
      const params = new FormData();
      params.append('get_measures', payload);
      const items = await API.smart(PATH, params);
      if (!items.error) commit('setMeasures', items.data);
    },
  },
  getters: {
    storeItems: (state) => state.storeItems,
    storeMeasures: (state) => state.measures,
  },
};
