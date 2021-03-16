export default {
  path: '/pos',
  name: 'pos',
  meta: {
    authrequired: true,
    title: 'Smart POS - Home',
    admin_access: false,
  },
  component: () => import('@/views/pos/home.vue'),
};
