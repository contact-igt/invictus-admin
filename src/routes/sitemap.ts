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
    id: 'Pet Tips',
    subheader: 'Pet Tips',
    path: paths.pettips,
    icon: 'hugeicons:book-open-01',
    active: true,
  },
  {
    id: 'users',
    subheader: 'Users',
    path: '#!',
    icon: 'mynaui:user-hexagon',
  },
  {
    id: 'messages',
    subheader: 'Messages',
    path: '#!',
    icon: 'mage:message-dots',
  },
  {
    id: 'settings',
    subheader: 'Settings',
    path: '#!',
    icon: 'hugeicons:settings-01',
  },
  // {
  //   id: 'authentication',
  //   subheader: 'Authentication',
  //   icon: 'mynaui:lock-password',
  //   active: true,
  //   items: [
  //     {
  //       name: 'Sign In',
  //       pathName: 'signin',
  //       icon: '',
  //       path: paths.signin,
  //     }
  //   ],
  // },
];

export default sitemap;
