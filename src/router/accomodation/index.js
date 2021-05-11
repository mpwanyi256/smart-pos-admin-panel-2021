export default {
  path: '/Accomodation',
  name: 'accomodation',
  meta: {
    authrequired: false,
    title: 'SmartPOS :: Accomodation',
  },
  component: () => import('@/views/Accomodation/Home.vue'),
  children: [
    // {
    //   path: '',
    //   name: 'accountingDashboard',
    //   meta: {
    //     authrequired: false,
    //     title: 'SmartPOS :: Accounting dashboard',
    //   },
    //   component: () => import('@/views/dashboard/Accounting/pages/Dashboard.vue'),
    // },
  ],
};
