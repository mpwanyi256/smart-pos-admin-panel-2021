export default {
  path: '/Settings',
  name: 'settings',
  meta: {
    authrequired: true,
    title: 'SmartPOS :: Settings',
  },
  component: () => import('@/views/Settings/Home.vue'),
  children: [
    {
      path: 'AccessControls',
      name: 'access_controls',
      meta: {
        authrequired: true,
        title: 'SmartPOS :: Access controls',
      },
      component: () => import('@/views/Settings/AccessControls.vue'),
    },
    {
      path: 'CompanySettings',
      name: 'company_settings',
      meta: {
        authrequired: true,
        title: 'SmartPOS :: Company settings',
      },
      component: () => import('@/views/Settings/CompanySettings.vue'),
    },
    {
      path: 'CompanyDepartments',
      name: 'company_departments',
      meta: {
        authrequired: true,
        title: 'SmartPOS :: Company departments',
      },
      component: () => import('@/views/Settings/Departments.vue'),
    },
    {
      path: 'Employees',
      name: 'company_employees',
      meta: {
        authrequired: true,
        title: 'SmartPOS :: Employees',
      },
      component: () => import('@/views/Settings/Employees.vue'),
    },
    {
      path: 'Sections',
      name: 'sections_and_tables',
      meta: {
        authrequired: true,
        title: 'SmartPOS :: Sections & Tables',
      },
      component: () => import('@/views/Settings/SectionsAndTables.vue'),
    },
    {
      path: 'Emailing',
      name: 'company_mail_list',
      meta: {
        authrequired: true,
        title: 'SmartPOS :: Mail List',
      },
      component: () => import('@/views/Settings/EmailList.vue'),
    },
    {
      path: 'Printers',
      name: 'printer_settings',
      meta: {
        authrequired: true,
        title: 'SmartPOS :: Printer Settings',
      },
      component: () => import('@/views/Settings/Printers.vue'),
    },
  ],
};
