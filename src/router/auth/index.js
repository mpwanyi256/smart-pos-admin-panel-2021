export default {
  path: '/',
  name: 'login',
  meta: {
    authrequired: false,
    title: 'Login',
  },
  component: () => import('@/views/auth/login.vue'),
};
