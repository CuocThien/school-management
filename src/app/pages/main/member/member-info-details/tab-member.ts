import { TabMenu } from 'src/app/core/models/common/tab-menu.model';

export const TAB_MEMBER: TabMenu[] = [
  {
    id: 1,
    name: 'TAB_MENU.INFORMATION',
    template: 'information',
    icon: 'fas fa-user',
  },
  {
    id: 2,
    name: 'TAB_MENU.ORDER',
    template: 'order',
    icon: 'fas fa-file-contract',
  },
  {
    id: 3,
    name: 'TAB_MENU.REFERRAL',
    template: 'referral',
    icon: 'fas fa-file-contract',
  },
  {
    id: 4,
    name: 'TAB_MENU.INTERACTIONS',
    template: 'interactions',
    icon: 'fas fa-people-arrows',
  },
  {
    id: 5,
    name: 'TAB_MENU.CHANGES',
    template: 'history',
    icon: 'fas fa-history',
  },
];
