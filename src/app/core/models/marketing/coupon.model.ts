export interface Coupon {
  id: string;
  code: string;
  nameEn: string;
  nameVi: string;
  endDate: string;
  isActive: string;
  duration: string;
  campaignId: string;
  isPrivate: string;
  limitPerDay: string;
  description: JSON;
  campaignNameVi: string;
  campaignNameEn: string;
  discountAmount: string;
  limitPerMember: string;
  isApplyAllPackage: string;
  discountPercentage: string;
  paymentMethod: string;
  image: string;
  startDate: string;
  updatedAt: string;
  updatedBy: string;
  createdAt: string;
  createdBy: string;
  deletedAt: string;
  deletedBy: string;
}

export interface ListCoupons extends Coupon {
  classCoupon: string;
}
