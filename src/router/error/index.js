export default {
  path: '/error',
  name: 'error',
  meta: {
    authrequired: false,
    title: '404',
  },
  component: () => import('@/views/Error.vue'),
};
