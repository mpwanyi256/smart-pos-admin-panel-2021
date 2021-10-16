export default {
  path: '/Accomodation',
  meta: {
    authrequired: false,
    title: 'SmartPOS :: Dashboard',
  },
  component: () => import('@/views/Accomodation/Home.vue'),
  children: [
    {
      path: '',
      name: 'accomodation_dashboard',
      meta: {
        authrequired: false,
        title: 'SmartPOS | Dashboard',
      },
      component: () => import('@/views/Accomodation/Dashboard.vue'),
    },
    {
      path: '',
      name: 'accomodation_statistics',
      meta: {
        authrequired: false,
        title: 'SmartPOS | Statistics',
      },
      component: () => import('@/views/Accomodation/Stats.vue'),
    },
  ],
};
