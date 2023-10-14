import { MenuItem } from '../../core/models/common/menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Hệ Thống',
    icon: 'bx-home-circle',
    permission: ['F_DASHBOARD'],
    subItems: [
      {
        label: 'Thông Báo',
        link: '/news',
        permission: ['F_MEMBER'],
      }
    ]
  },
  {
    label: 'Học Sinh',
    icon: 'bx bxs-graduation',
    link: '',
    permission: ['ADMIN', 'FORM_TEACHER', 'TEACHER'],
    subItems: [
      {
        label: 'Hồ Sơ Học Sinh',
        link: '/students',
        permission: ['FORM_TEACHER', 'ADMIN'],
      },
      {
        label: 'Đánh Giá Môn Học',
        link: '/subject-assessment',
        permission: ['ADMIN', 'TEACHER', 'FORM_TEACHER'],
      },
    ],
  },
  {
    label: 'Giáo Viên',
    icon: 'bx bxs-group',
    link: '/',
    permission: ['F_STAFF'],
    subItems: [
      {
        label: 'Cơ Cấu Tổ Chức',
        link: '/',
        permission: ['F_STAFF'],
      },
    ],
  },
];
