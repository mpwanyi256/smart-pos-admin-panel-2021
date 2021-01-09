export default {
  path: '/Accounting',
  name: 'accounting',
  meta: {
    authrequired: false,
    title: 'SmartPOS :: Accounting',
  },
  component: () => import('@/views/dashboard/Accounting/Home.vue'),
  children: [
    {
      path: '',
      name: 'accountingDashboard',
      meta: {
        authrequired: false,
        title: 'SmartPOS :: Accounting dashboard',
      },
      component: () => import('@/views/dashboard/Accounting/pages/Dashboard.vue'),
    },
  ],
};
