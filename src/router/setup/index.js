export default {
  path: '/Setup',
  name: 'setup',
  meta: {
    authrequired: false,
  },
  component: () => import('@/views/auth/setup.vue'),
};
