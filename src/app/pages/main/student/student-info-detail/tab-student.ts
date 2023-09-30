import { TabMenu } from 'src/app/core/models/common/tab-menu.model';

export const TAB_STUDENT: TabMenu[] = [
  {
    id: 1,
    name: 'TAB_MENU.DETAIL',
    template: 'detail',
    icon: 'fas fa-user',
  },
  {
    id: 2,
    name: 'TAB_MENU.STUDY_PROCESS',
    template: 'study-process',
    icon: 'fas fa-file-contract',
  },
  {
    id: 3,
    name: 'TAB_MENU.CLASSIFICATION',
    template: 'classification',
    icon: 'fas fa-file-contract',
  }
];
