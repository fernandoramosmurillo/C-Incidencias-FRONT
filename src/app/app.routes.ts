import { Routes } from '@angular/router';
import { ReportPageComponent } from './paginas/home/report.page/report.page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./paginas/Independientes/auth-page/auth-page.component').then(
        (m) => m.AuthPageComponent,
      ),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige /auth a /auth/login
      {
        path: 'register',
        loadComponent: () =>
          import('./Componentes/login-card/register-form/register-form.component').then(
            (m) => m.RegisterFormComponent,
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./Componentes/login-card/login-form/login-form.component').then(
            (m) => m.LoginFormComponent,
          ),
      },
      {
        path: 'verification-pending',
        loadComponent: () =>
          import('./Componentes/login-card/verification-pending/verification-pending.component').then(
            (m) => m.VerificationPendingComponent,
          ),
      },
    ],
  },
  {
    path: 'app',
    loadComponent: () =>
      import('./Componentes/app-frame/app-frame.component').then(
        (m) => m.AppFrameComponent,
      ),
    children: [
      {
        path: 'inicio',
        loadComponent: () =>
          import('./paginas/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'reportar-incidencia',
        loadComponent: () =>
          import('./paginas/home/report.page/report.page.component').then(
            (m) => m.ReportPageComponent,
          ),
      },
      {
        path: 'incidencias/:idIncidencia',
        loadComponent: () =>
          import('./paginas/home/incidencia-pagina/incidencia-pagina.component').then(
          (m) => m.IncidenciaPaginaComponent,
        )
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  {
    path: '**', // El comodín global siempre al final
    redirectTo: 'auth/login',
  },
];
