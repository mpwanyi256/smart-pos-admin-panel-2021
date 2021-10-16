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
        title: 'Inventory | Dashboard',
      },
      component: () => import('@/views/inventory/Dashboard.vue'),
    },
    {
      path: 'inv_storeItems',
      name: 'inv_storeItems',
      meta: {
        authrequired: true,
        title: 'Inventory | Store Items',
      },
      component: () => import('@/views/inventory/StoreItems.vue'),
    },
    {
      path: 'inv_recipes',
      name: 'inv_recipes',
      meta: {
        authrequired: true,
        title: 'Inventory | Receipes',
      },
      component: () => import('@/views/inventory/Recipes.vue'),
    },
    {
      path: 'inv_suppliers',
      name: 'inv_suppliers',
      meta: {
        authrequired: true,
        title: 'Inventory | Suppliers',
      },
      component: () => import('@/views/inventory/Suppliers.vue'),
    },
    {
      path: 'inv_purchases',
      name: 'inv_purchases',
      meta: {
        authrequired: true,
        title: 'Inventory | Purchases',
      },
      component: () => import('@/views/inventory/PurchaseInvoices.vue'),
    },
    {
      path: 'inv_supplier_payments',
      name: 'inv_supplier_payments',
      meta: {
        authrequired: true,
        title: 'Inventory | Payments',
      },
      component: () => import('@/views/inventory/SupplierPayments.vue'),
    },
    {
      path: 'inv_supplier_statements',
      name: 'inv_supplier_statements',
      meta: {
        authrequired: true,
        title: 'Inventory | Statements',
      },
      component: () => import('@/views/inventory/SupplierStatements.vue'),
    },
  ],
};
