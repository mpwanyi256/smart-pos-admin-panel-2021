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
      return orderItems;
    },
    async getSettlementAmounts({ commit }, payload) {
      commit('toggleLoading', true);
      const data = new FormData();
      data.append('settlement_date', payload);
      data.append('get_settlements', payload);
      const settlements = await API.smart(PATH, data);
      return settlements;
    },
    async CancelOrderItem({ commit, dispatch }, payload) {
      commit('toggleLoading', true);
      const data = new FormData();
      data.append('cancel_order_item', payload.id);
      data.append('reason', payload.reason);
      data.append('cancelled_by', payload.cancelled_by);
      data.append('order_id', payload.order_id);
      data.append('order_date', payload.order_date);

      const CANCEL = await API.smart(PATH, data);
      dispatch('getOrders');
      commit('toggleLoading', false);
      return CANCEL.data;
    },

    async getClients({ commit }, payload) {
      commit('toggleLoading', true);
      const data = new FormData();
      data.append('get_pos_clients', payload);
      const CLIENTS = await API.smart(PATH, data);
      commit('toggleLoading', false);
      return CLIENTS;
    },

    async filterOrders({ commit }, payload) {
      commit('toggleLoading', true);
      const filters = new FormData();
      filters.append('find_bill', payload.bill_no);
      filters.append('from', payload.from);
      filters.append('to', payload.to);
      filters.append('client_id', payload.client_id);

      const Orders = await API.smart(PATH, filters);
      // console.log(Orders);
      commit('toggleLoading', false);
      return Orders;
    },
  },
  getters: {
    orders: (state) => state.orders,
    loading: (state) => state.loading,
  },
};
