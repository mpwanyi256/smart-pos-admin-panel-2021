import API from '@/api';

const PATH = 'inventory/';

export default {
  namespaced: true,
  state: {
    storeItems: [],
  },
  mutations: {
    setStoreItems(state, payload) {
      state.storeItems = payload;
    },
  },
  actions: {
    async getStoreItems({ commit }, payload) {
      const params = new FormData();
      params.append('get_store_items', 'all');
      params.append('company_id', payload.company_id);
      const items = await API.smart(PATH, params);
      console.log('Store items', items);
      if (!items.error) commit('setStoreItems', items.data);
    },
  },
  getters: {
    storeItems: (state) => state.storeItems,
  },
};
