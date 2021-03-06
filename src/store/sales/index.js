/* eslint-disable consistent-return */
import API from '@/api';

const PATH = 'scylla/';

export default {
  namespaced: true,
  state: {
    currentSale: '',
    orders: [],
    salesSammary: null,
    loading: false,
    error: null,
  },
  mutations: {
    setSale(state, payload) {
      state.currentSale = payload;
    },
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
      const DayOpen = dayOpen || localStorage.getItem('smart_company_day_open');
      if (DayOpen) {
        const data = new FormData();
        data.append('day_filter', DayOpen);
        data.append('all_orders', 1);
        const sales = await API.smart(PATH, data);
        const orders = sales.data;

        if (orders.error) return commit('setError', orders.message);

        commit('setOrders', orders.orders);
        commit('setSale', orders);
      } else {
        commit('setError', 'No day open found');
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
      commit('toggleLoading', false);
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
      commit('toggleLoading', false);
      return Orders;
    },

    async getMenuItems({ commit }, payload) {
      commit('toggleLoading', true);
      const filters = new FormData();
      filters.append('get_menu_items', payload.item_id);
      const menuItems = await API.smart(PATH, filters);
      commit('toggleLoading', false);
      return menuItems;
    },

    async getDepartments({ commit }) {
      commit('toggleLoading', true);
      const filters = new FormData();
      filters.append('get_departments', 'all');
      const departments = await API.smart(PATH, filters);
      commit('toggleLoading', false);
      return departments;
    },

    async fetchItemsSold({ commit }, payload) {
      if (!payload) return null;
      commit('toggleLoading', true);
      const filters = new FormData();
      filters.append('fetch_items_sold', payload.menu_item);
      filters.append('department_id', payload.department);
      filters.append('from', payload.date_from);
      filters.append('to', payload.date_to);
      const items = await API.smart(PATH, filters);

      commit('toggleLoading', false);
      return items;
    },

    async fetchSalesSummary({ commit }, payload) {
      if (!payload) return null;
      commit('toggleLoading', true);
      const filters = new FormData();
      filters.append('fetch_sales_summary', payload.from);
      filters.append('sales_from', payload.from);
      filters.append('sales_to', payload.to);
      const Sales = await API.smart(PATH, filters);
      commit('toggleLoading', false);
      return Sales;
    },
  },
  getters: {
    orders: (state) => state.orders,
    loading: (state) => state.loading,
    sale: (state) => state.currentSale,
  },
};
