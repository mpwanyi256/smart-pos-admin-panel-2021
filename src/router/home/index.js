export default {
  path: '/home',
  name: 'home',
  meta: {
    authrequired: true,
    title: 'Home',
  },
  component: () => import('@/views/dashboard/home.vue'),
  children: [
    {
      path: 'sales',
      name: 'sales',
      meta: {
        authrequired: true,
        title: 'SmartPOS :: Sales',
      },
      component: () => import('@/views/dashboard/sales/sales.vue'),
      children: [
        {
          path: 'overview',
          name: 'overview',
          meta: {
            authrequired: true,
            title: 'Sales :: Dashboard',
          },
          component: () => import('@/views/dashboard/sales/reports/salesOverview.vue'),
        },
        {
          path: 'findbill',
          name: 'findbill',
          meta: {
            authrequired: true,
            title: 'SmartPOS :: Find bill',
          },
          component: () => import('@/views/dashboard/sales/reports/findBill.vue'),
        },
        {
          path: 'itemwisesale',
          name: 'itemwisesale',
          meta: {
            authrequired: true,
            title: 'SmartPOS :: Items sold',
          },
          component: () => import('@/views/dashboard/sales/reports/ItemsSold.vue'),
        },
        {
          path: 'salesSammary',
          name: 'salessammary',
          meta: {
            authrequired: true,
            title: 'SmartPOS :: Sales summary',
          },
          component: () => import('@/views/dashboard/sales/reports/SalesSammary.vue'),
        },
        {
          path: 'menu_items',
          name: 'menu_items',
          meta: {
            authrequired: true,
            title: 'Sales :: Menu Items',
          },
          component: () => import('@/views/dashboard/sales/MenuItems.vue'),
        },
        {
          path: 'menu_categories',
          name: 'menu_categories',
          meta: {
            authrequired: true,
            title: 'Sales | Menu Item categories',
          },
          component: () => import('@/views/dashboard/sales/MenuCategories.vue'),
        },
      ],
    },
  ],
};
