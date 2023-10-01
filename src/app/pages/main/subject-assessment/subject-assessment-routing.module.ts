import { Routes } from '@angular/router';
// import { NgxPermissionsGuard } from 'ngx-permissions';
// import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { AccountTypeGuard } from 'src/app/core/guards/account-type.guard';
import { SubjectAssessmentPageComponent } from './subject-assessment-page/subject-assessment-page.component';
export const subjectAssessmentRoutes: Routes = [
  {
    path: 'subject-assessment',
    component: SubjectAssessmentPageComponent,
    pathMatch: 'full',
    canActivate: [AccountTypeGuard],
    data: {
      permissions: {
        only: ['FORM_TEACHER', 'TEACHER', 'ADMIN'],
        redirectTo: UrlConstant.ROUTE.MAIN.NEWS,
      },
    },
  },

];
