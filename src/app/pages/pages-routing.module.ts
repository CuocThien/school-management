import { Routes } from '@angular/router';
import { SystemConstant } from '../core/constants/system.constant';
import { UrlConstant } from '../core/constants/url.constant';
import { AuthGuard } from '../core/guards/auth.guard';
import { NewsComponent } from './main/dashboards/news/news.component';

export const pagesRoutes: Routes = [
  {
    path: '',
    redirectTo: 'news',
    pathMatch: 'full',
  },
  {
    path: 'news',
    component: NewsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./main/member/member.module').then((m) => m.MemberModule),
    canActivate: [AuthGuard],
    data: {
      permissions: {
        only: SystemConstant.PERMISSIONS.F_MEMBER,
        redirectTo: UrlConstant.ROUTE.MAIN.PAGE_404,
      },
    },
  },
  {
    path: '',
    loadChildren: () =>
      import('./main/student/student.module').then((m) => m.StudentModule),
    canActivate: [AuthGuard],
    data: {
      permissions: {
        only: SystemConstant.PERMISSIONS.F_MEMBER,
        redirectTo: UrlConstant.ROUTE.MAIN.PAGE_404,
      },
    },
  },
];
