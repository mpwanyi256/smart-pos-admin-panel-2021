export default {
  path: '/inventory',
  name: 'inventory',
  meta: {
    authrequired: true,
    title: 'Inventory',
  },
  component: () => import('@/views/inventory/home.vue'),
  children: [
    {
      path: 'inv_dashboard',
      name: 'inv_dashboard',
      meta: {
        authrequired: true,
        title: 'Inventory',
      },
      component: () => import('@/views/inventory/Dashboard.vue'),
    },
    {
      path: 'inv_storeItems',
      name: 'inv_storeItems',
      meta: {
        authrequired: true,
        title: 'Inventory',
      },
      component: () => import('@/views/inventory/StoreItems.vue'),
    },
    {
      path: 'inv_recipes',
      name: 'inv_recipes',
      meta: {
        authrequired: true,
        title: 'Inventory',
      },
      component: () => import('@/views/inventory/Recipes.vue'),
    },
    {
      path: 'inv_suppliers',
      name: 'inv_suppliers',
      meta: {
        authrequired: true,
        title: 'Suppliers',
      },
      component: () => import('@/views/inventory/Suppliers.vue'),
    },
    {
      path: 'inv_purchases',
      name: 'inv_purchases',
      meta: {
        authrequired: true,
        title: 'Purchases',
      },
      component: () => import('@/views/inventory/PurchaseInvoices.vue'),
    },
  ],
};
