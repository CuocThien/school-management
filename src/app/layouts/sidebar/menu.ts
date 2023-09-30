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
    permission: ['F_MEMBER'],
    subItems: [
      {
        label: 'Hồ Sơ Học Sinh',
        link: '/students',
        permission: ['F_MEMBER'],
      },
      {
        label: 'Đánh Giá Môn Học',
        link: '/',
        permission: ['F_MEMBER'],
      },
      {
        label: 'Xếp Loại Hạnh Kiểm',
        link: '/',
        permission: ['G_LISTCHANGES']
      }
    ],
  },
  {
    label: 'Giáo Viên',
    icon: 'bx bxs-group',
    link: '/staff',
    permission: ['F_STAFF'],
    subItems: [
      {
        label: 'Cơ Cấu Tổ Chức',
        link: '/staff/list-staff',
        permission: ['F_STAFF'],
      },
    ],
  },
];
