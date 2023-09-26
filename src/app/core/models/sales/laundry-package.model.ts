export interface LaundryPackage {
  id: string;
  nameEn: string;
  nameVi: string;
  key: string;
  colorCode: string;
  imageId: string;
  descriptionEn: string;
  descriptionVi: string;
  isActive: false;
  accessRuleId: string;
  duration: string;
  startDate: string;
  endDate: string;
  remindXDaysBeforeExpire: number;
  membershipFee: string;
  joiningFee: string;
  isAppliesToAllClubs: boolean;
  isAvailableForAdminWeb: boolean;
  isAvailableForCustomerWeb: boolean;
  isAvailableForMobileApp: boolean;
  paymentPlanGroupId: number;
  isSubscription: boolean;
  isDefault: boolean;
  paymentPlanGroupDesEn: string;
  paymentPlanGroupDesVi: string;
}