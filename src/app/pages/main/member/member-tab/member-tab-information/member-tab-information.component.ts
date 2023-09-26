import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
// import { map, sum } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { SystemConstant } from 'src/app/core/constants/system.constant';
// import { MemberService } from 'src/app/core/services/member/member.service';
import { ShareService } from 'src/app/core/services/share/share.service';
import { FormBanOpenAccountComponent } from '../../form-members/form-ban-open-account/form-ban-open-account.component';

@Component({
  selector: 'app-member-tab-information',
  templateUrl: './member-tab-information.component.html',
  styleUrls: ['./member-tab-information.component.scss'],
})
export class MemberTabInformationComponent implements OnInit {
  @Input() userId: string;
  contractDebit = 0;
  ptContractDebit = 0;
  freezeContractDebit = 0;
  dateFormat = SystemConstant.TIME_FORMAT.DD_MM_YY;
  // ChangeClub
  openSelectBox = false;
  userMemberInfo: any;
  isDeletedUser: boolean

  paymentPlanNameEn = '';
  paymentPlanNameVi = '';
  listPaymentPlan = [];
  accessRuleNameEn = '';
  accessRuleNameVi = '';
  startDate = '';
  endDate = '';

  constructor(
    private spinner: NgxSpinnerService,
    // private memberSvc: MemberService,
    private shareSvc: ShareService,
    public translate: TranslateService,
    private modalSvc: NgbModal,
  ) { }

  ngOnInit(): void {
    this._getAllUserInfo();
  }

  private async _getAllUserInfo() {
    this.spinner.show();
    // const [memberDebitTranRes, ptDebitTranRes, freezeDebitTranRes]: [any, any, any] = await Promise.all([
    //   // this.memberSvc.getListMemberDebitTransactions(this.userId).toPromise(),
    //   this.memberSvc.getListPtDebitTransactions(this.userId).toPromise(),
    //   this.memberSvc.getListFreezeDebitTransactions(this.userId).toPromise()
    // ]);
    // this.contractDebit = sum(
    //   map(memberDebitTranRes.data, 'needPaid').map((itm) => Number(itm))
    // );
    // this.ptContractDebit = sum(
    //   map(ptDebitTranRes.data, 'needPaid').map((itm) => Number(itm))
    // );
    // this.freezeContractDebit = sum(
    //   map(freezeDebitTranRes.data, 'paymentTotal').map((itm) => Number(itm))
    // );

    this.shareSvc.getMemberInfoByAccountId(this.userId).subscribe((res: any) => {
      this.userMemberInfo = res.data;
      this.isDeletedUser = Boolean(res.data.deletedAt);
      const paymentDetail = this.userMemberInfo.paymentPlanDetail[0];
      const memberContract = this.userMemberInfo.memberContract;
      this.paymentPlanNameEn = paymentDetail.nameEn;
      this.paymentPlanNameVi = paymentDetail.nameVi;
      this.accessRuleNameEn = paymentDetail.accessRule.nameEn;
      this.accessRuleNameVi = paymentDetail.accessRule.nameVi;
      this.startDate = memberContract.startDate;
      this.endDate = memberContract.expireDate;
      this.listPaymentPlan = this.userMemberInfo.paymentPlanDetail;
    });

    this.spinner.hide();
  }

  public onChangeAccessRules(item: any) {
    this.paymentPlanNameEn = item.nameEn;
    this.paymentPlanNameVi = item.nameVi;
    this.accessRuleNameEn = item.accessRule.nameEn;
    this.accessRuleNameVi = item.accessRule.nameVi;
    this.startDate = item.startDate;
    this.endDate = item.endDate;
  }

  public banAccount() {
    const modalRef = this.modalSvc.open(FormBanOpenAccountComponent, {
      centered: true,
      size: 'md',
      backdrop: true,
    });
    modalRef.componentInstance.isDeletedUser = this.isDeletedUser;
    modalRef.componentInstance.userId = this.userId;
    modalRef.componentInstance.closeModal.subscribe((res) => {
      return res ? this._getAllUserInfo() : {};
    });
  }

  // -----------ChangeClub---------------
  toggleClubs() {
    this.openSelectBox = !this.openSelectBox;
  }
}
