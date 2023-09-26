import { AccessRule } from '../access-rule/access-rule.model';

export class LaundryPackage {
  id?: number;
  nameEn?: string;
  nameVi?: string;
  key?: string;
  descriptionEn?: string;
  descriptionVi?: string;
  isActive?: boolean;
  duration?: string;
  price?: string;
  isApplyForStudent?: boolean;
  isApplyForBusiness?: boolean;
  isApplyForPublic?: boolean;
  isApplyForWeekend?: boolean;
  isApplyForWeekday?:boolean;
  laundryPackageGroupId?: number;
  isDefault?: boolean;
}

export class LaundryPackageDetail extends LaundryPackage {
  accessRule?: AccessRule
}