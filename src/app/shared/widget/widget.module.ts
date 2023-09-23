import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ClickOutsideModule } from 'ng-click-outside';
import { TableBonusComponent } from './table-bonus/table-bonus.component';
import { UserInfoDetailsComponent } from './user-info-details/user-info-details.component';
import { BreadcrumbComponent } from './breadcrumb/breadcumb.component';
import { StatComponent } from './stat/stat.component';

export const pluginsModules = [
  TranslateModule,
  NgSelectModule,
  ClickOutsideModule
];
@NgModule({
  declarations: [
    TableBonusComponent,
    UserInfoDetailsComponent,
    BreadcrumbComponent,
    StatComponent
  ],
  imports: [
    CommonModule,
    pluginsModules
  ],
  exports: [
    TableBonusComponent,
    UserInfoDetailsComponent,
    BreadcrumbComponent,
    StatComponent
  ]
})
export class WidgetModule { }
