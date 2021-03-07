export default {
  path: '/inventory',
  name: 'inventory',
  meta: {
    authrequired: false,
    title: 'Inventory',
  },
  component: () => import('@/views/inventory/home.vue'),
  children: [
    {
      path: 'inv_dashboard',
      name: 'inv_dashboard',
      meta: {
        authrequired: false,
        title: 'Inventory',
      },
      component: () => import('@/views/inventory/Dashboard.vue'),
    },
    {
      path: 'inv_storeItems',
      name: 'inv_storeItems',
      meta: {
        authrequired: false,
        title: 'Inventory',
      },
      component: () => import('@/views/inventory/StoreItems.vue'),
    },
    {
      path: 'inv_recipes',
      name: 'inv_recipes',
      meta: {
        authrequired: false,
        title: 'Inventory',
      },
      component: () => import('@/views/inventory/Recipes.vue'),
    },
  ],
};
