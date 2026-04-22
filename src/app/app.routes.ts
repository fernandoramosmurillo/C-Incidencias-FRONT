import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'login',
    loadComponent: () => import('./paginas/login-page/login-page.component').then( m => m.LoginPageComponent)
  },
  {
    path: '',
    loadComponent: () => import('./Componentes/app-frame/app-frame.component').then( m => m.AppFrameComponent),
    children: [
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () => import('./paginas/home/home.page').then( m => m.HomePage)
      },
    ]
  }
];
