export default {
  path: '/RealEstates',
  name: 'RealEstates',
  meta: {
    authrequired: true,
    title: 'SmartPOS | Real estates',
  },
  component: () => import('@/views/estates/home.vue'),
  children: [
    {
      path: 'tenants',
      name: 'tenants',
      meta: {
        authrequired: true,
        title: 'Real estates | Tenants',
      },
      component: () => import('@/views/Settings/Clients.vue'),
    },
    {
      path: 'properties',
      name: 'properties',
      meta: {
        authrequired: true,
        title: 'Real estates | Properties',
      },
      component: () => import('@/views/estates/Properties.vue'),
    },
    {
      path: 'landlords',
      name: 'landlords',
      meta: {
        authrequired: true,
        title: 'Real estates | Landlords',
      },
      component: () => import('@/views/estates/Landlords.vue'),
    },
    {
      path: 'units',
      name: 'units',
      meta: {
        authrequired: true,
        title: 'Real estates | Units',
      },
      component: () => import('@/views/estates/Units.vue'),
    },
    {
      path: 'contracts',
      name: 'contracts',
      meta: {
        authrequired: true,
        title: 'Real estates | Tenant Contracts',
      },
      component: () => import('@/views/estates/Contracts.vue'),
    },
  ],
};
