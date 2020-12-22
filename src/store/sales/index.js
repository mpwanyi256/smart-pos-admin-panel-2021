/* eslint-disable consistent-return */
import API from '@/api';

const PATH = 'scylla/';

export default {
  namespaced: true,
  state: {
    orders: [],
    salesSammary: null,
    loading: false,
    error: null,
  },
  mutations: {
    setError(state, payload) {
      state.error = { status: true, message: payload };
    },
    toggleLoading(state, payload) {
      state.loading = payload;
    },
    setOrders(state, payload) {
      state.orders = payload;
    },
  },
  actions: {
    async getOrders({ commit }, dayOpen) {
      commit('toggleLoading', true);
      const DayOpen = dayOpen || localStorage.getItem('smart_company_day_open');
      if (DayOpen) {
        const data = new FormData();
        data.append('day_filter', DayOpen);
        data.append('all_orders', 1);
        const sales = await API.smart(PATH, data);
        const orders = sales.data;

        if (orders.error) return commit('setError', orders.message);

        commit('setOrders', orders.orders);
      } else {
        commit('setError', 'No day open found');
        commit('toggleLoading', false);
      }
    },
    async getOrderItems({ commit }, orderId) {
      commit('toggleLoading', true);
      const data = new FormData();
      data.append('get_order_items', orderId);
      const items = await API.smart(PATH, data);
      const orderItems = items;
      commit('toggleLoading', false);
      console.log('Items', orderItems);
      return orderItems;
    },
  },
  getters: {
    orders: (state) => state.orders,
  },
};
