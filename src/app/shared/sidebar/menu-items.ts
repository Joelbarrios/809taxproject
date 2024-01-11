import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
 
  {
    path: '/admin/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/admin/component/table',
    title: 'Forms English',
    icon: 'bi bi-layout-split',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/admin/component/table-es',
    title: 'Form Spanish',
    icon: 'bi bi-layout-split',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/admin/component/archived',
    title: 'Form english Archived',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/admin/component/archived-es',
    title: 'Form Spanish Archived',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    submenu: []
  },
 
  
  {
    path: '/admin/about',
    title: 'About',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    submenu: []
  },
  // {
  //   path: '/users/users',
  //   title: 'List of users',
  //   icon: 'bi bi-people',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // }
];
