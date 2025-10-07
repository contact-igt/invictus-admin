import paths from './paths';

export interface SubMenuItem {
  name: string;
  pathName: string;
  path: string;
  icon?: string;
  active?: boolean;
  items?: SubMenuItem[];
}

export interface MenuItem {
  id: string;
  subheader: string;
  path?: string;
  icon?: string;
  avatar?: string;
  active?: boolean;
  items?: SubMenuItem[];
}

const sitemap: MenuItem[] = [
  {
    id: 'dashboard',
    subheader: 'Overview',
    path: '/',
    icon: 'hugeicons:grid-view',
    active: true,
  },
  {
    id: 'vls',
    subheader: 'Vls',
    icon: 'mynaui:user-hexagon',
    active: true,
    items: [
      {
        name: 'Vls Law Practice',
        pathName: paths.vlsLawPractice,
        path: paths.vlsLawPractice,
        icon: 'mynaui:user-hexagon',
      },
      {
        name: 'Vls Academy',
        pathName: paths.vlsAcademy,
        path: paths.vlsAcademy,
        icon: 'mynaui:user-hexagon',
      },
    ],
  },
  {
    id: 'invictus',
    subheader: 'Invictus',
    icon: 'mynaui:user-hexagon',
    active: true,
    items: [
      {
        name: 'Invictus Leads',
        pathName: paths.invictusLeads,
        path: paths.invictusLeads,
        icon: 'mynaui:user-hexagon',
      },
      {
        name: 'Invictus Meta',
        pathName: paths.invictusMeta,
        path: paths.invictusMeta,
        icon: 'mynaui:user-hexagon',
      },
    ],
  },
  {
    id: 'mirra-builders',
    path: paths.mirraBuilders,
    subheader: 'Mirra Builders',
    icon: 'mynaui:user-hexagon',
    active: true,
  },
  {
    id: 'kr-institute',
    path: paths.krInstitute,
    subheader: 'KR Institute',
    icon: 'mynaui:user-hexagon',
    active: true,
  },
  {
    id: 'pixel-eye',
    path: paths.pixelEye,
    subheader: 'Pixel Eye',
    icon: 'mynaui:eye',
    active: true,
  },
  {
    id: 'ramanans-financial',
    path: paths.ramanansFinancial,
    subheader: 'RV Financial',
    icon: 'mdi:finance',
    active: true,
  },

  // {
  //   id: 'users',
  //   subheader: 'Users',
  //   path: paths.users,
  //   icon: 'mynaui:user-hexagon',
  //   active: true,
  // },
  // {
  //   id: 'pets',
  //   subheader: 'Pets',
  //   path: paths.pets,
  //   icon: 'mdi:paw',
  //   active: true,
  // },
  // {
  //   id: 'Pet Tips',
  //   subheader: 'Pet Tips',
  //   path: paths.pettips,
  //   icon: 'mdi:dog',
  //   active: true,
  // },
  // {
  //   id: 'events',
  //   subheader: 'Future Events',
  //   path: paths.events,
  //   active: true,
  //   icon: 'mdi:calendar-clock',
  // },
  // {
  //   id: 'notifications',
  //   subheader: 'Notifications',
  //   icon: 'solar:bell-outline',
  // },
  // {
  //   id: 'helpcenter',
  //   subheader: 'Help Center',
  //   icon: 'carbon:help',
  // },
];

export default sitemap;
