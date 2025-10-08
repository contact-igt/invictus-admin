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
    id: 'invictus',
    subheader: 'Invictus',
    icon: 'mynaui:user-hexagon',
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
    id: 'vls',
    subheader: 'Vls',
    icon: 'mynaui:user-hexagon',
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
    id: 'pixel-eye',
    path: paths.pixelEye,
    subheader: 'Pixel Eye',
    icon: 'mynaui:eye',
    active: true,
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
    id: 'ramanans-financial',
    path: paths.ramanansFinancial,
    subheader: 'RV Financial',
    icon: 'mdi:finance',
    active: true,
  },

];

export default sitemap;
