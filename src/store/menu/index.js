import API from '@/api';

const PATH = 'menu/';

export default {
  namespaced: true,
  state: {
    loading: false,
    menuItems: [],
    departments: [],
    menuCategories: [],
  },
  mutations: {
    setCategories(state, payload) {
      state.menuCategories = payload;
    },
    setDepartments(state, payload) {
      state.departments = payload;
    },
    setMenuItems(state, payload) {
      state.menuItems = payload;
    },
    toggleLoading(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    toggleLoad({ commit }, payload) {
      commit('toggleLoading', payload);
    },

    async getMenuItems({ commit }, payload) {
      commit('toggleLoading', true);
      const filters = new FormData();
      filters.append('get_menu_items', payload.department_id);
      const menuItems = await API.smart(PATH, filters);
      if (!menuItems.error) commit('setMenuItems', menuItems.data);
      commit('toggleLoading', false);
      return menuItems;
    },

    async getDepartments({ commit }, payload) {
      commit('toggleLoading', true);
      const filters = new FormData();
      filters.append('get_departments', payload);
      const departments = await API.smart(PATH, filters);
      if (!departments.error) {
        commit('setDepartments', [{ id: 0, name: 'ALL' }, ...departments.data]);
      }
      commit('toggleLoading', false);
    },

    async updateItemStatus({ commit }, payload) {
      commit('toggleLoading', true);
      console.log('Update', payload);
      const filters = new FormData();
      filters.append('update_item_status', true);
      filters.append('item_id', payload.id);
      filters.append('item_status', payload.status);
      const update = await API.smart(PATH, filters);
      commit('toggleLoading', false);
      return update;
    },

    async getMenuCategories({ commit }) {
      commit('toggleLoading', true);
      const filters = new FormData();
      filters.append('get_menu_categories', true);
      const categories = await API.smart(PATH, filters);
      if (!categories.error) commit('setCategories', categories.data);
      commit('toggleLoading', false);
    },

  },
  getters: {
    loading: (state) => state.loading,
    menuItems: (state) => state.menuItems,
    departments: (state) => state.departments,
    categories: (state) => state.menuCategories,
  },
};
