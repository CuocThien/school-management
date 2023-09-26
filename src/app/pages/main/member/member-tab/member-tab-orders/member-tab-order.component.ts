import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { Store } from 'src/app/core/models/share/store.model';
import { LaundryPackage } from 'src/app/core/models/share/laundry-package.model';
import { Query } from 'src/app/core/models/share/query.model';
import { ShareService } from 'src/app/core/services/share/share.service';
import { getDataSelect, getTimeFormat } from 'src/app/core/utils';
import { FormConfirmBoxComponent } from 'src/app/shared/forms/form-confirm-box/form-confirm-box.component';
import { FormAddMemberContractComponent } from '../../form-members/form-add-member-contract/form-add-member-contract.component';
import { FormAddMemberTransactionsComponent } from '../../form-members/form-add-member-transactions/form-add-member-transactions.component';
import { FormEditMemberTransactionsComponent } from '../../form-members/form-edit-member-transactions/form-edit-member-transactions.component';

@Component({
  selector: 'app-member-tab-order',
  templateUrl: './member-tab-order.component.html',
  styleUrls: ['./member-tab-order.component.scss'],
})
export class MemberTabOrderComponent implements OnInit {
  @Input() userId: string;
  @Input() memberType: string;
  listMemberOrders = [];
  listMemberTransactions = [];
  listTngPayHistory = [];
  listSubscription = [];
  listClub: Store[] = [];
  listLaundryPackage: LaundryPackage[] = [];
  listStatus = {
    0: 'color color-red',
    1: 'color color-green'
  };
  listChargetype = {
    1: 'T0',
    2: 'T3',
    3: 'T7'
  };
  dayFormat = SystemConstant.TIME_FORMAT.DD_MM_YY;
  timeFormat = SystemConstant.TIME_FORMAT.HH_MM_SS;
  systemConstant = SystemConstant.STATUS;
  // Filter
  selectedDateTime: {
    startDate: moment.Moment;
    endDate: moment.Moment;
  };
  dateLimit = SystemConstant.DATE_RANGE.DATE_LIMIT;
  selectedClub: number;
  selectedPaymentPlan: number;
  isDisableSelected: boolean;
  selectedStatus: string;
  startDate: moment.Moment = null;
  endDate: moment.Moment = null;
  // Pagination
  total: number;
  pages: number;
  page = SystemConstant.PAGING.PAGES;
  pageSizeContracts = SystemConstant.PAGING.PAGESIZE;
  pageSizeTransactions = SystemConstant.PAGING.PAGESIZE;
  pageSizeTngPayHistory = SystemConstant.PAGING.PAGESIZE;
  pageSizeSubscription = SystemConstant.PAGING.PAGESIZE;
  // Query
  clubId: number;
  paymentPlanId: number;
  constructor(
    private spinner: NgxSpinnerService,
    private shareSvc: ShareService,
    private modalSvc: NgbModal,
    public translate: TranslateService,
  ) { }

  async ngOnInit() {
    this.listClub = await getDataSelect(this.shareSvc.getListStores());
    this._getDataByRole();
  }

  private _getDataByRole() {
    this.getListMemberOrders(this.userId);
    this._getListLaundryPackage(this.clubId);
  }

  private _getListLaundryPackage(clubId: number) {
    if (![undefined].includes(clubId)) {
      this.spinner.show();
      this.shareSvc.getListLaundryPackage().subscribe(
        (res: any) => {
          this.listLaundryPackage = res.data;
          this.spinner.hide();
        },
        () => this.spinner.hide()
      );
    }
  }


  private _deleteMemberContract(contractId: string) {
    console.log('🐼 => MemberTabOrderComponent => contractId:', contractId);
    this.spinner.show();
    // this.memberSvc.deleteMemberContract(contractId).subscribe(
    //   (res) => {
    //     if (res) {
    //       this.alert.success(this.translate.instant('FORM.DELETE_SUCCESS'));
    //       this.getListMemberOrders(this.userId);
    //       this.spinner.hide();
    //     }
    //   },
    //   () => this.spinner.hide()
    // );
  }

  private _deleteMemberTransaction(transactionId: string) {
    console.log('🐼 => MemberTabOrderComponent => transactionId:', transactionId);
    this.spinner.show();
    // this.memberSvc.deleteMemberTransaction(transactionId).subscribe(
    //   (res) => {
    //     if (res) {
    //       this.alert.success(this.translate.instant('FORM.DELETE_SUCCESS'));
    //       this.getListMemberTransactions(this.userId);
    //       this.spinner.hide();
    //     }
    //   },
    //   () => this.spinner.hide()
    // );
  }

  private _unFreezeMemberContract(userId: string, model: any) {
    console.log('🐼 => MemberTabOrderComponent => model:', model);
    console.log('🐼 => MemberTabOrderComponent => userId:', userId);
    this.spinner.show();
    // this.memberSvc.unfreezeMemberContract(userId, model).subscribe(
    //   (res) => {
    //     if (res) {
    //       this.alert.success(
    //         this.translate.instant('FORM.UNFREEZE_CONTRACT_SUCCESS')
    //       );
    //       this.getListMemberOrders(this.userId);
    //       this.spinner.hide();
    //     }
    //   },
    //   () => this.spinner.hide()
    // );
  }

  private _cancelSubscription(model) {
    console.log('🐼 => MemberTabOrderComponent => model:', model);
    this.spinner.show();
    // this.memberSvc.cancelSubscription(model).subscribe(
    //   (res) => {
    //     if (res) {
    //       this.alert.success(
    //         this.translate.instant('FORM.CANCEL_SUBSCRIPTION_SUCCESS')
    //       );
    //       this.getListSubscription(this.userId);
    //       this.spinner.hide();
    //     }
    //   },
    //   () => this.spinner.hide()
    // );
  }

  public loadNext(page: number, type: string) {
    this.page = page;
    const _type = {
      Contracts: () => {
        this.getListMemberOrders(this.userId);
      },
      Transactions: () => {
        this.getListMemberTransactions(this.userId);
      },
      TngPayHistory: () => {
        this.getListTngPayHistory(this.userId);
      },
      Subcription: () => {
        this.getListSubscription(this.userId);
      }
    };
    return _type[type]();
  }

  public onChangeClub(selectedClub: number) {
    if (![undefined, this.clubId].includes(selectedClub)) {
      this.clubId = selectedClub;
      this.paymentPlanId = this.selectedPaymentPlan = null;
      this.listLaundryPackage = [];
      this.page = 1;
      this.getListMemberOrders(this.userId);
      this._getListLaundryPackage(this.clubId);
    }
  }

  public onChangePaymentPlan(selectedPaymentPlan: number) {
    if (![undefined, this.paymentPlanId].includes(selectedPaymentPlan)) {
      this.paymentPlanId = selectedPaymentPlan;
      this.page = 1;
      this.getListMemberOrders(this.userId);
    }
  }

  public onFilterDateChange(event: any) {
    const { startDate, endDate } = event;
    const sdIsOldValue = [this.startDate].includes(startDate);
    const edIsOldValue = [this.endDate].includes(endDate);
    if (sdIsOldValue && edIsOldValue) {
      return;
    }
    this.page = 1;
    this.startDate = event.startDate;
    this.endDate = event.endDate;
    this.getListTngPayHistory(this.userId);
  }

  public onFilterDateSubscription(event: any) {
    const { startDate, endDate } = event;
    const sdIsOldValue = [this.startDate].includes(startDate);
    const edIsOldValue = [this.endDate].includes(endDate);
    if (sdIsOldValue && edIsOldValue) {
      return;
    }
    this.page = 1;
    this.startDate = event.startDate;
    this.endDate = event.endDate;
    this.getListSubscription(this.userId);
  }

  public getMemberClass(memberData: any) {
    if (memberData.isFrozen) {
      return SystemConstant.CLASS_STATUS.FREEZED;
    }
    if (memberData.status) {
      const typeClass = {
        CURRENT: SystemConstant.CLASS_STATUS.CURRENT,
        FUTURE: SystemConstant.CLASS_STATUS.FUTURE,
        PAST: SystemConstant.CLASS_STATUS.PAST,
        WAITFORPAYMENT: SystemConstant.CLASS_STATUS.WAITFORPAYMENT,
        WAITFORRENEW: SystemConstant.CLASS_STATUS.WAITFORRENEW
      };
      return typeClass[memberData.status];
    }
    return SystemConstant.CLASS_STATUS.DEFAULT;
  }

  public onChangeLimit(userId: string, type: string) {
    this.page = 1;
    const _type = {
      Contracts: () => {
        this.getListMemberOrders(userId);
      },
      Transactions: () => {
        this.getListMemberTransactions(userId);
      },
      TngPayHistory: () => {
        this.getListTngPayHistory(userId);
      },
      Subcription: () => {
        this.getListSubscription(userId);
      }
    };
    return _type[type]();
  }

  public getListMemberOrders(userId: string, options?: Query) {
    console.log('🐼 => MemberTabOrderComponent => userId:', userId);
    this.spinner.show();
    options = {
      clubId: this.clubId,
      paymentPlanId: this.paymentPlanId,
      page: this.page,
      limit: this.pageSizeContracts,
    };
    console.log('🐼 => MemberTabOrderComponent => options:', options);
    // this.memberSvc
    //   .getListMemberOrders(userId, omitBy(options, isNil))
    //   .subscribe(
    //     (res: any) => {
    //       this.listMemberOrders = res.data.result.map((item: any) => ({
    //         ...item,
    //         classMember: this.getMemberClass(item),
    //         isAllowFreeze: this._checkAllowFreezeContract(item),
    //         isAllowUnfreeze: this._checkAllowUnfreezeContract(item),
    //       }));
    //       this.total = res.data.total;
    //       this.pages = getPage(this.total, this.pageSizeContracts);
    //       this.spinner.hide();
    //     },
    //     () => this.spinner.hide()
    //   );
  }

  public getListMemberTransactions(userId: string, options?: Query) {
    console.log('🐼 => MemberTabOrderComponent => userId:', userId);
    this.spinner.show();
    options = {
      page: this.page,
      limit: this.pageSizeTransactions,
    };
    console.log('🐼 => MemberTabOrderComponent => options:', options);
    // this.memberSvc
    //   .getListMemberOrderTransactions(userId, omitBy(options, isNil))
    //   .subscribe(
    //     (res: any) => {
    //       this.total = res.data.total;
    //       this.pages = getPage(this.total, this.pageSizeTransactions);
    //       this.listMemberTransactions = res.data.result.map((item: any) => ({
    //         ...item,
    //         debit:
    //           item.status === SystemConstant.STATUS.DEBIT
    //             ? item.transactionAmount
    //             : null,
    //         transactionAmount:
    //           item.status !== SystemConstant.STATUS.DEBIT
    //             ? item.transactionAmount
    //             : null,
    //         isAllowDelete:
    //           item.paymentType !== this.systemConstant.FREEZE_CONTRACT,
    //       }));
    //       this.spinner.hide();
    //     },
    //     () => this.spinner.hide()
    //   );
  }

  public getListTngPayHistory(userId: string, options?: Query) {
    console.log('🐼 => MemberTabOrderComponent => userId:', userId);
    this.spinner.show();
    options = {
      status: this.selectedStatus,
      page: this.page,
      startDate: getTimeFormat(this.startDate),
      endDate: getTimeFormat(this.endDate),
      limit: this.pageSizeTngPayHistory,
    };
    console.log('🐼 => MemberTabOrderComponent => options:', options);
    // this.memberSvc.getListTngPayHistory(userId, omitBy(options, isNil)).subscribe((res: any) => {
    //   this.listTngPayHistory = res.data.result.map((item) => ({
    //     ...item,
    //     classStatus: this.listStatus[item.isSuccess],
    //     chargeType: this.listChargetype[item.chargeIndex]
    //   }));
    //   this.total = res.data.total;
    //   this.pages = getPage(this.total, this.pageSizeTngPayHistory);
    //   this.spinner.hide();
    // }, () => this.spinner.hide());
  }

  public getListSubscription(userId: string, options?: Query) {
    console.log('🐼 => MemberTabOrderComponent => userId:', userId);
    this.spinner.show();
    options = {
      startDate: getTimeFormat(this.startDate),
      endDate: getTimeFormat(this.endDate),
      page: this.page,
      limit: this.pageSizeSubscription,
    };
    console.log('🐼 => MemberTabOrderComponent => options:', options);
    // this.memberSvc.getListSubscriptionMemberContract(userId, omitBy(options, isNil)).subscribe((res: any) => {
    //   this.listSubscription = res.data.result.map((item: any) => ({
    //     ...item,
    //     classStatus: SystemConstant.CLASS_STATUS[item.status]
    //   }));
    //   this.total = res.data.total;
    //   this.pages = getPage(this.total, this.pageSizeSubscription);
    // }, () => this.spinner.hide());
    this.spinner.hide();
  }

  // Open Modal Add New Contract & Transactions
  public editMemberContract(order: any) {
    const modalRef = this.modalSvc.open(FormAddMemberContractComponent, {
      centered: true,
      size: 'lg',
      backdrop: true,
    });
    modalRef.componentInstance.order = order;
    modalRef.componentInstance.userId = this.userId;
    modalRef.componentInstance.memberType = this.memberType;
    modalRef.componentInstance.action = SystemConstant.ACTION.EDIT;
    modalRef.componentInstance.closeModal.subscribe((res) => {
      return res ? this.getListMemberOrders(this.userId) : {};
    });
  }

  public editMemberTransaction(memberTransactions: any) {
    const modalRef = this.modalSvc.open(FormEditMemberTransactionsComponent, {
      centered: true,
      size: 'lg',
      backdrop: true,
    });
    modalRef.componentInstance.memberTransactions = memberTransactions;
    modalRef.componentInstance.closeModal.subscribe((res) => {
      return res ? this.getListMemberTransactions(this.userId) : {};
    });
  }

  public addMemberContract() {
    const modalRef = this.modalSvc.open(FormAddMemberContractComponent, {
      centered: true,
      size: 'lg',
      backdrop: true,
    });
    modalRef.componentInstance.userId = this.userId;
    modalRef.componentInstance.memberType = this.memberType;
    modalRef.componentInstance.action = SystemConstant.ACTION.CREATE;
    modalRef.componentInstance.closeModal.subscribe((res) => {
      return res ? this.getListMemberOrders(this.userId) : {};
    });
  }

  public addMemberTransaction() {
    const modalRef = this.modalSvc.open(FormAddMemberTransactionsComponent, {
      centered: true,
      size: 'lg',
      backdrop: true,
    });
    modalRef.componentInstance.userId = this.userId;
    modalRef.componentInstance.closeModal.subscribe((res) => {
      return res ? this.getListMemberTransactions(this.userId) : {};
    });
  }

  public deleteMemberContract(contractId: string) {
    const modalRef = this.modalSvc.open(FormConfirmBoxComponent, {
      centered: true,
      size: 'md',
      backdrop: true,
    });
    modalRef.componentInstance.title = 'FORM.CONFIRM_DELETE_CONTRACT';
    modalRef.componentInstance.closeModal.subscribe((res) => {
      return res ? this._deleteMemberContract(contractId) : {};
    });
  }

  public unfreezeMemberContract(contractId: string) {
    const modalRef = this.modalSvc.open(FormConfirmBoxComponent, {
      centered: true,
      size: 'md',
      backdrop: true,
    });
    modalRef.componentInstance.title = 'FORM.UNFREEZE_CONTRACT';
    modalRef.componentInstance.closeModal.subscribe((res) => {
      return res
        ? this._unFreezeMemberContract(this.userId, {
          memberContractId: contractId,
        })
        : {};
    });
  }

  public deleteMemberTransaction(transactionId: string) {
    const modalRef = this.modalSvc.open(FormConfirmBoxComponent, {
      centered: true,
      size: 'md',
      backdrop: true,
    });
    modalRef.componentInstance.title = 'FORM.CONFIRM_DELETE_TRANSACTION';
    modalRef.componentInstance.closeModal.subscribe((res) => {
      return res ? this._deleteMemberTransaction(transactionId) : {};
    });
  }

  public cancelSubscription(userId, clubId) {
    const model = {
      accountId: userId,
      clubId
    };
    const modalRef = this.modalSvc.open(FormConfirmBoxComponent, {
      centered: true,
      size: 'md',
      backdrop: true,
    });
    modalRef.componentInstance.title = 'FORM.CONFIRM_CANCEL_SUCSCRIPTION';
    modalRef.componentInstance.closeModal.subscribe((res) => {
      return res ? this._cancelSubscription(model) : {};
    });
  }

}
