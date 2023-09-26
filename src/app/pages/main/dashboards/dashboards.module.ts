import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SkeletonLoaderModule } from 'src/app/shared/skeleton-loader/skeleton-loader.module';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { NewsComponent } from './news/news.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { FormAddEditNewsComponent } from './news/form-news/form-add-edit-news/form-add-edit-news.component';
import { ViewDetailNotificationComponent } from './news/form-news/view-detail-notification/view-detail-notification.component';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: NewsComponent
  }
];
export const pluginsModules = [
  NgbNavModule,
  NgbPaginationModule,
  NgxDaterangepickerMd.forRoot(),
  NgApexchartsModule,
  NgSelectModule,
  TranslateModule,
  HighchartsChartModule,
  NgbTooltipModule,
  NgxPermissionsModule.forChild(),
  NgxEchartsModule.forRoot({
    echarts: () => import('echarts')
  }),
  SkeletonLoaderModule
];
@NgModule({
  declarations: [
    NewsComponent,
    FormAddEditNewsComponent,
    ViewDetailNotificationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    pluginsModules,
    WidgetModule,
    // Router
    RouterModule.forChild(dashboardRoutes)
  ]
})
export class DashboardsModule { }
