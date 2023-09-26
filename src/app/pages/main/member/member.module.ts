import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { NgbDropdownModule, NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxPermissionsModule } from 'ngx-permissions';
import { FormsShareModule } from 'src/app/shared/forms/form-share.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { FormAddMemberContractComponent } from './form-members/form-add-member-contract/form-add-member-contract.component';
import { FormAddMemberTransactionsComponent } from './form-members/form-add-member-transactions/form-add-member-transactions.component';
import { FormAddNoteInteractionsComponent } from './form-members/form-add-note-interactions/form-add-note-interactions.component';
import { FormEditMemberContractComponent } from './form-members/form-edit-member-contract/form-edit-member-contract.component';
import { FormEditMemberTransactionsComponent } from './form-members/form-edit-member-transactions/form-edit-member-transactions.component';
import { FormBanOpenAccountComponent } from './form-members/form-ban-open-account/form-ban-open-account.component';
import { ListAccessControlComponent } from './list-access-control/list-access-control.component';
import { ListClubMembersComponent } from './list-club-members/list-club-members.component';
import { ListNowInClubComponent } from './list-now-in-club/list-now-in-club.component';
import { MemberInfoDetailsComponent } from './member-info-details/member-info-details.component';
import { memberRoutes } from './member-routing.module';
import { MemberTabChangesComponent } from './member-tab/member-tab-changes/member-tab-changes.component';
import { MemberTabOrderComponent } from './member-tab/member-tab-orders/member-tab-order.component';
import { MemberTabInformationComponent } from './member-tab/member-tab-information/member-tab-information.component';
import { MemberTabInteractionsComponent } from './member-tab/member-tab-interactions/member-tab-interactions.component';
import { MemberTabChangeDetailComponent } from './member-tab/member-tab-change-detail/member-tab-change-detail.component';
import { ListAccountChangeLogComponent } from './list-account-change-log/list-account-change-log.component';
import { MemberTabReferralsComponent } from './member-tab/member-tab-referrals/member-tab-referrals.component';
import { ListMemberTypeComponent } from './list-member-type/list-member-type.component';
import { FormConfirmRequestChangeTypeComponent } from './form-member-type/form-confirm-request-change-type/form-confirm-request-change-type.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';


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

export const memberTab = [
  MemberTabInformationComponent,
  MemberTabOrderComponent,
  MemberTabInteractionsComponent,
  MemberTabChangesComponent,
  MemberTabReferralsComponent,
];

export const memberForm = [
  FormAddMemberContractComponent,
  FormAddMemberTransactionsComponent,
  FormAddNoteInteractionsComponent,
  FormEditMemberContractComponent,
  FormEditMemberTransactionsComponent,
  FormBanOpenAccountComponent
];
@NgModule({
  declarations: [
    ListClubMembersComponent,
    MemberInfoDetailsComponent,
    ListNowInClubComponent,
    memberForm,
    memberTab,
    ListAccessControlComponent,
    MemberTabChangeDetailComponent,
    ListAccountChangeLogComponent,
    MemberTabReferralsComponent,
    ListMemberTypeComponent,
    FormConfirmRequestChangeTypeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    pluginsModules,
    // Routers
    RouterModule.forChild(memberRoutes),
  ]
})
export class MemberModule { }
