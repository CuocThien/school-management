import { Routes } from '@angular/router';
// import { SystemConstant } from '../core/constants/system.constant';
// import { UrlConstant } from '../core/constants/url.constant';
// import { AuthGuard } from '../core/guards/auth.guard';

export const pagesRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  // {
  //   path: 'settings',
  //   loadChildren: () => import('./main/settings/settings.module').then((m) => m.SettingsModule),
  //   canActivate: [AuthGuard],
  //   data: {
  //     permissions: {
  //       only: SystemConstant.PERMISSIONS.F_MARKETING,
  //       redirectTo: UrlConstant.ROUTE.MAIN.PAGE_404,
  //     },
  //   },
  // },
];
