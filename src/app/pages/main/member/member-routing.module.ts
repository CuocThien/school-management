import { Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { ListAccessControlComponent } from './list-access-control/list-access-control.component';
import { ListAccountChangeLogComponent } from './list-account-change-log/list-account-change-log.component';
import { ListClubMembersComponent } from './list-club-members/list-club-members.component';
import { ListMemberTypeComponent } from './list-member-type/list-member-type.component';
import { ListNowInClubComponent } from './list-now-in-club/list-now-in-club.component';
import { MemberInfoDetailsComponent } from './member-info-details/member-info-details.component';
import { MemberTabReferralsComponent } from './member-tab/member-tab-referrals/member-tab-referrals.component';

export const memberRoutes: Routes = [
  {
    path: 'club-members',
    component: ListClubMembersComponent,
    pathMatch: 'full',
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: SystemConstant.PERMISSIONS.F_MEMBER,
        redirectTo: UrlConstant.ROUTE.MAIN.DASHBOARD,
      },
    },
  },
  {
    path: 'now-in-club',
    component: ListNowInClubComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: SystemConstant.PERMISSIONS.F_MEMBER,
        redirectTo: UrlConstant.ROUTE.MAIN.DASHBOARD,
      }
    }
  },
  {
    path: 'access-control',
    component: ListAccessControlComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: SystemConstant.PERMISSIONS.F_MEMBER,
        redirectTo: UrlConstant.ROUTE.MAIN.DASHBOARD,
      },
    },
  },
  {
    path: 'club-members/:id',
    component: MemberInfoDetailsComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: SystemConstant.PERMISSIONS.F_MEMBER,
        redirectTo: UrlConstant.ROUTE.MAIN.DASHBOARD,
      },
    },
  },
  {
    path: 'club-members/:id/information',
    component: MemberInfoDetailsComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: SystemConstant.PERMISSIONS.F_MEMBER,
        redirectTo: UrlConstant.ROUTE.MAIN.DASHBOARD,
      },
    },
  },
  {
    path: 'club-members/:id/order',
    component: MemberInfoDetailsComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: SystemConstant.PERMISSIONS.F_MEMBER,
        redirectTo: UrlConstant.ROUTE.MAIN.DASHBOARD,
      },
    },
  },
  {
    path: 'club-members/:id/referral',
    component: MemberTabReferralsComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: SystemConstant.PERMISSIONS.F_MEMBER,
        redirectTo: UrlConstant.ROUTE.MAIN.DASHBOARD,
      },
    },
  },
  {
    path: 'club-members/:id/product',
    component: MemberInfoDetailsComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: SystemConstant.PERMISSIONS.F_MEMBER,
        redirectTo: UrlConstant.ROUTE.MAIN.DASHBOARD,
      },
    },
  },
  {
    path: 'club-members/:id/access-control',
    component: MemberInfoDetailsComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: SystemConstant.PERMISSIONS.F_MEMBER,
        redirectTo: UrlConstant.ROUTE.MAIN.DASHBOARD,
      },
    },
  },
  {
    path: 'club-members/:id/interactions',
    component: MemberInfoDetailsComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: SystemConstant.PERMISSIONS.F_MEMBER,
        redirectTo: UrlConstant.ROUTE.MAIN.DASHBOARD,
      },
    },
  },
  {
    path: 'club-members/:id/bookings',
    component: MemberInfoDetailsComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: SystemConstant.PERMISSIONS.F_MEMBER,
        redirectTo: UrlConstant.ROUTE.MAIN.DASHBOARD,
      },
    },
  },
  {
    path: 'club-members/:id/freeze',
    component: MemberInfoDetailsComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: SystemConstant.PERMISSIONS.F_MEMBER,
        redirectTo: UrlConstant.ROUTE.MAIN.DASHBOARD,
      },
    },
  },
  {
    path: 'club-members/:id/history',
    component: MemberInfoDetailsComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: SystemConstant.PERMISSIONS.F_MEMBER,
        redirectTo: UrlConstant.ROUTE.MAIN.DASHBOARD,
      },
    },
  },
  {
    path: 'account-change-log',
    component: ListAccountChangeLogComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: SystemConstant.PERMISSIONS.F_MEMBER,
        redirectTo: UrlConstant.ROUTE.MAIN.DASHBOARD,
      },
    },
  },
  {
    path: 'change-member-type',
    component: ListMemberTypeComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: SystemConstant.PERMISSIONS.F_MEMBER,
        redirectTo: UrlConstant.ROUTE.MAIN.DASHBOARD,
      },
    },
  }

];
