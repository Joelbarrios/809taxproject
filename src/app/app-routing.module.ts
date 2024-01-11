import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './auth/login/login/login.component';
import { HomePageComponent } from './homePage/home-page/home-page.component';

export const Approutes: Routes = [
  {
    path:'',
    loadChildren: () => import('./homePage/home-page.module').then(m => m.HomePageModule)
  },
  {
     path: '', redirectTo: '/noFound', pathMatch: 'full' 
  },
  {
    path: 'admin',
    component: FullComponent,
    children: [
      {
      path: '', redirectTo: '/dashboard', pathMatch: 'full' 
   },
      
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
    },
   {
        path: 'users',
       loadChildren: () => import('./users/user-module.module').then(m => m.UserModuleModule)
    }
    ]
  },{
    path: 'login',
  component: LoginComponent
  },
  {
    path: '**',
    redirectTo: '/starter'
  }
];
