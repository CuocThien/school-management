import { Routes } from '@angular/router';
// import { NgxPermissionsGuard } from 'ngx-permissions';
// import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { AccountTypeGuard } from 'src/app/core/guards/account-type.guard';
import { StudentInfoDetailComponent } from './student-info-detail/student-info-detail.component';
import { StudentTabDetailComponent } from './student-tabs/student-tab-detail/student-tab-detail.component';
import { StudentTabStudyProcessComponent } from './student-tabs/student-tab-study-process/student-tab-study-process.component';
import { StudentTabClassificationComponent } from './student-tabs/student-tab-classification/student-tab-classification.component';

export const studentRoutes: Routes = [
  {
    path: 'students',
    component: StudentProfileComponent,
    pathMatch: 'full',
    canActivate: [AccountTypeGuard],
    data: {
      permissions: {
        only: ['FORM_TEACHER', 'ADMIN'],
        redirectTo: UrlConstant.ROUTE.MAIN.NEWS,
      },
    },
  },
  {
    path: 'students/:id',
    component: StudentInfoDetailComponent,
    pathMatch: 'full',
  },
  {
    path: 'students/:id/detail',
    component: StudentTabDetailComponent,
    pathMatch: 'full',
  },
  {
    path: 'students/:id/study-process',
    component: StudentTabStudyProcessComponent,
    pathMatch: 'full',
  },
  {
    path: 'students/:id/classification',
    component: StudentTabClassificationComponent,
    pathMatch: 'full',
  },

];
