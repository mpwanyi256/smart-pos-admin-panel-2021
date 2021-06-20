export default {
  path: '/Accounting',
  meta: {
    authrequired: true,
    title: 'SmartPOS :: Accounting',
  },
  component: () => import('@/views/dashboard/Accounting/Home.vue'),
  children: [
    {
      path: '',
      name: 'accountingDashboard',
      meta: {
        authrequired: true,
        title: 'SmartPOS :: Accounting dashboard',
      },
      component: () => import('@/views/dashboard/Accounting/pages/Dashboard.vue'),
    },
  ],
};
