import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { subjectAssessmentRoutes } from './subject-assessment-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgbDropdownModule, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsShareModule } from 'src/app/shared/forms/form-share.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { NgxPermissionsModule } from 'ngx-permissions';

import bootstrapPlugin from '@fullcalendar/bootstrap';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { SubjectAssessmentPageComponent } from './subject-assessment-page/subject-assessment-page.component';

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
  ReactiveFormsModule,
  NgbDropdownModule,
  FullCalendarModule,
  FormsShareModule,
  PipesModule,
  DropzoneModule,
  NgxPermissionsModule.forChild()
];

const subjectAssessmentTab = [
];
const subjectAssessmentForm = [];

@NgModule({
  declarations: [
    subjectAssessmentTab,
    subjectAssessmentForm,
    SubjectAssessmentPageComponent,
  ],
  imports: [
    CommonModule,
    pluginsModules,
    RouterModule.forChild(subjectAssessmentRoutes),
  ]
})
export class SubjectAssessmentModule { }
