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


      },
      {
        name: 'Invictus Meta',
        pathName: paths.invictusMeta,
        path: paths.invictusMeta,


      },
    ],
  },
  {
    id: 'vls',
    subheader: 'Vls',
    icon: 'hugeicons:court-law',
    items: [
      {
        name: 'Vls Law Practice',
        pathName: paths.vlsLawPractice,
        path: paths.vlsLawPractice,

      },
      {
        name: 'Vls AIBE',
        pathName: paths.vlsAibe,
        path: paths.vlsAibe,
      },
      {
        name: 'Vls Academy',
        pathName: paths.vlsAcademy,
        path: paths.vlsAcademy,
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
    icon: 'hugeicons:building-05',
    active: true,
  },
  {
    id: 'kr-institute',
    path: paths.krInstitute,
    subheader: 'KR Institute',
    icon: 'hugeicons:school',
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
