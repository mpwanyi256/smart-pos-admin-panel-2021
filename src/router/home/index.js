export default {
  path: '/home',
  name: 'home',
  meta: {
    authrequired: true,
  },
  component: () => import('@/views/dashboard/home.vue'),
  children: [
    {
      path: 'sales',
      name: 'sales',
      meta: {
        authrequired: true,
      },
      component: () => import('@/views/dashboard/sales/sales.vue'),
      children: [
        {
          path: 'overview',
          name: 'overview',
          meta: {
            authrequired: true,
          },
          component: () => import('@/views/dashboard/sales/reports/salesOverview.vue'),
        },
        {
          path: 'findbill',
          name: 'findbill',
          meta: {
            authrequired: true,
          },
          component: () => import('@/views/dashboard/sales/reports/findBill.vue'),
        },
      ],
    },
  ],
};
