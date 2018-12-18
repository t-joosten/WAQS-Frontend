import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    data: {
      permission: 'menu',
      resource: 'dashboard'
    },
  }, {
    title: 'Apparaten',
    icon: 'nb-audio',
    link: '/pages/devices',
    data: {
      permission: 'menu',
      resource: 'devices'
    },
  }, {
    title: 'Informatie',
    icon: 'nb-info',
    link: '/pages/info',
    data: {
      permission: 'menu',
      resource: 'information'
    },
  }, {
    title: 'Gebruikers',
    icon: 'nb-person',
    link: '/pages/users',
    data: {
      permission: 'menu',
      resource: 'users'
    },
  }
];
