import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { RouterModule } from '@angular/router';
import { studentRoutes } from './student-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgbDropdownModule, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { FormsModule } from '@angular/forms';
import { FormsShareModule } from 'src/app/shared/forms/form-share.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { NgxPermissionsModule } from 'ngx-permissions';

import bootstrapPlugin from '@fullcalendar/bootstrap';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { StudentTabDetailComponent } from './student-tabs/student-tab-detail/student-tab-detail.component';
import { StudentTabStudyProcessComponent } from './student-tabs/student-tab-study-process/student-tab-study-process.component';
import { StudentTabClassificationComponent } from './student-tabs/student-tab-classification/student-tab-classification.component';
import { StudentInfoDetailComponent } from './student-info-detail/student-info-detail.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin,
]);

export const pluginsModules = [
  NgbTooltipModule,
  NgSelectModule,
  TranslateModule,
  NgbNavModule,
  NgbPaginationModule,
  NgxDaterangepickerMd.forRoot(),
  WidgetModule,
  FormsModule,
  NgbDropdownModule,
  FullCalendarModule,
  FormsShareModule,
  PipesModule,
  DropzoneModule,
  NgxPermissionsModule.forChild()
];

const studentTab = [
  StudentTabDetailComponent,
  StudentTabStudyProcessComponent,
  StudentTabClassificationComponent
];
const studentForm = [];

@NgModule({
  declarations: [
    StudentProfileComponent,
    studentTab,
    studentForm,
    StudentInfoDetailComponent,
  ],
  imports: [
    CommonModule,
    pluginsModules,
    RouterModule.forChild(studentRoutes),

  ]
})
export class StudentModule { }
