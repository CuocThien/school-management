import { MenuItem } from '../../core/models/common/menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'MENUITEMS.DASHBOARDS.TEXT',
    icon: 'bx-home-circle',
    link: '/dashboard',
    permission: ['F_DASHBOARD'],
  },
  // {
  //   label: 'MENUITEMS.MEMBER.TEXT',
  //   icon: 'bx bx-group',
  //   link: '',
  //   permission: ['F_MEMBER'],
  //   subItems: [
  //     {
  //       label: 'MENUITEMS.MEMBER.LIST.CLUB_MEMBER',
  //       link: '/club-members',
  //       permission: ['F_MEMBER'],
  //     },
  //     {
  //       label: 'MENUITEMS.MEMBER.LIST.MEMBER_TYPE',
  //       link: '/change-member-type',
  //       permission: ['F_MEMBER'],
  //     },
  //     {
  //       label: 'MENUITEMS.MEMBER.LIST.ACCOUNT_CHANGES_LOG',
  //       link: '/account-change-log',
  //       permission: ['G_LISTCHANGES']
  //     }
  //   ],
  // },
];
