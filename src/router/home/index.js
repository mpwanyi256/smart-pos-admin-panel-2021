export default {
  path: '/home',
  name: 'home',
  component: () => import('@/views/dashboard/home.vue'),
  children: [
    {
      path: 'sales',
      name: 'sales',
      component: () => import('@/views/dashboard/sales/sales.vue'),
      children: [
        {
          path: 'overview',
          name: 'overview',
          component: () => import('@/views/dashboard/sales/reports/salesOverview.vue'),
        },
        {
          path: 'findbill',
          name: 'findbill',
          component: () => import('@/views/dashboard/sales/reports/findBill.vue'),
        },
      ],
    },
  ],
};
