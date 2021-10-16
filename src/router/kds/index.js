export default {
  path: '/kds',
  name: 'kds',
  meta: {
    authrequired: true,
    title: 'KDS',
    admin_access: false,
  },
  component: () => import('@/views/kds/kds.vue'),
};
