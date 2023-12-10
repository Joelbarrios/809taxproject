import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
 
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/table',
    title: 'Forms',
    icon: 'bi bi-layout-split',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/#',
    title: 'Archived',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/about',
    title: 'About',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/users/users',
    title: 'List of users',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    submenu: []
  }
];
