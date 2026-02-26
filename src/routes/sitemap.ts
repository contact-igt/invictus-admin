import paths from './paths';

export interface SubMenuItem {
  name: string;
  pathName: string;
  path: string;
  icon?: string;
  active?: boolean;
  clientKey?: string;
  items?: SubMenuItem[];
}

export interface MenuItem {
  id: string;
  subheader: string;
  path?: string;
  icon?: string;
  avatar?: string;
  active?: boolean;
  clientKey?: string;
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
    clientKey: 'invictus',
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
    clientKey: 'vls_law',
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
    clientKey: 'pixel_eye',
  },
  {
    id: 'mirra-builders',
    path: paths.mirraBuilders,
    subheader: 'Mirra Builders',
    icon: 'hugeicons:building-05',
    active: true,
    clientKey: 'mirra_builders',
  },
  {
    id: 'kr-institute',
    path: paths.krInstitute,
    subheader: 'KR Institute',
    icon: 'hugeicons:school',
    active: true,
    clientKey: 'kr_institute',
  },
  {
    id: 'ramanans-financial',
    path: paths.ramananFinancial,
    subheader: 'RV Financial',
    icon: 'mdi:finance',
    active: true,
    clientKey: 'ramanan_financial',
  },
  {
    id: 'naitrika',
    path: paths.naitrika,
    subheader: 'Naitrika',
    icon: 'mdi:eye-circle',
    active: true,
    clientKey: 'naitrika',
  },
  {
    id: 'antardrashtinetralaya',
    path: paths.netralaya,
    subheader: 'Netralaya',
    icon: 'hugeicons:eye',
    active: true,
    clientKey: 'netralaya',
  },
  {
    id: 'wellinit',
    path: paths.wellinit,
    subheader: 'Wellinit',
    icon: 'mdi:phone-plus',
    active: true,
    clientKey: 'wellinit',
  },
  {
    id: 'mahimmy-foods',
    path: paths.mahimmyFoods,
    subheader: 'Mahimmy Foods',
    icon: 'mdi:bread-slice',
    active: true,
    clientKey: 'mahimmy_foods',
  },
  {
    id: 'ophthall-webinar',
    path: paths.ophthallWebinar,
    subheader: 'Ophthall Webinar',
    icon: 'hugeicons:eye',
    active: true,
    clientKey: 'ophthall_webinar',
  },
  {
    id: 'user-management',
    path: paths.management,
    subheader: 'User Management',
    icon: 'hugeicons:user-group-active',
    active: true,
  },
];

export default sitemap;
