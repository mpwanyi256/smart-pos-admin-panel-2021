import API from '@/api';

const PATH = 'accounts/';

export default {
  namespaced: true,
  state: {
    loading: false,
    expenseHeads: [],
    ledgers: [],
  },
  mutations: {
    setLoading(state, payload) { state.loading = payload; },
    setExpenseHeads(state, payload) { state.expenseHeads = payload; },
    setLedgers(state, payload) { state.ledgers = payload; },
  },
  actions: {
    async CreateExpenseHead({ commit }, payload) {
      commit('setLoading', true);
      const data = new FormData();
      data.append('create_expense_head', payload.name);
      data.append('description', payload.description);
      const response = await API.smart(PATH, data);
      commit('setLoading', false);
      return response;
    },
    async GetExpenseHeads({ commit }) {
      commit('setLoading', true);
      const filters = new FormData();
      filters.append('get_expense_heads', 'all');
      const response = await API.smart(PATH, filters);
      commit('setLoading', false);
      if (!response.error) commit('setExpenseHeads', response.data);
    },
    async DeleteExpensehead({ commit }, payload) {
      commit('setLoading', true);
      const filters = new FormData();
      filters.append('delete_expense_head', payload.id);
      const response = await API.smart(PATH, filters);
      commit('setLoading', false);
      return response;
    },
    async UpdateExpenseHead({ commit }, payload) {
      commit('setLoading', true);
      const filters = new FormData();
      filters.append('update_expense_head', payload.id);
      filters.append('title', payload.title);
      filters.append('description', payload.description);
      const response = await API.smart(PATH, filters);
      commit('setLoading', false);
      return response;
    },
    async CreateLedger({ commit }, payload) {
      commit('setLoading', true);
      const filters = new FormData();
      filters.append('expense_head_id', payload.expense_head);
      filters.append('create_ledger_account', payload.ledger);

      const response = await API.smart(PATH, filters);

      commit('setLoading', false);
      return response;
    },
    async GetLedgers({ commit }) {
      commit('setLoading', true);
      const filters = new FormData();
      filters.append('fetch_ledgers', 'all');
      const response = await API.smart(PATH, filters);
      commit('setLedgers', response.data);

      commit('setLoading', false);
      return response;
    },
    async DeleteLedgerAccount({ commit }, payload) {
      commit('setLoading', true);
      const filters = new FormData();
      filters.append('delete_expense_ledger', payload.ledger_id);
      const response = await API.smart(PATH, filters);
      commit('setLoading', false);
      return response;
    },

    async UpdateLedgerAccount({ commit }, payload) {
      commit('setLoading', true);
      const filters = new FormData();
      filters.append('update_ledger', payload.ledger_id);
      filters.append('expense_head', payload.expense_head);
      filters.append('ledger', payload.ledger);
      const response = await API.smart(PATH, filters);
      commit('setLoading', false);
      return response;
    },
  },
  getters: {
    expenseHeads: (state) => state.expenseHeads,
    allLedgers: (state) => state.ledgers,
  },
};
