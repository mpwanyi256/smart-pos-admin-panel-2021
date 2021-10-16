export default {
  path: '/pos',
  name: 'pos',
  meta: {
    authrequired: true,
    title: 'Smart POS',
    admin_access: false,
  },
  component: () => import('@/views/pos/home.vue'),
};
