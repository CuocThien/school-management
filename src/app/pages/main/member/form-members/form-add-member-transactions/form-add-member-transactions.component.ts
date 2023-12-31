import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Store } from 'src/app/core/models/share/store.model';
import { ShareService } from 'src/app/core/services/share/share.service';
import { getDataSelect } from 'src/app/core/utils';

@Component({
  selector: 'app-form-add-member-transactions',
  templateUrl: './form-add-member-transactions.component.html',
  styleUrls: ['./form-add-member-transactions.component.scss']
})
export class FormAddMemberTransactionsComponent implements OnInit {
  @Input() userId: any;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;
  // 
  listClub: Store[] = [];
  listPaymentMethod: any = [];
  listMemberDebitTransaction: any = [];
  listCoupons: any = [];
  // Code Bên CRM Cũ
  manualTransactionType = 'MEMBER';
  manualPaymentPlanTransaction = '';
  manualClubIdTransaction = '';
  isAllowChangeStartDate = false;
  isAllowEditStartDate = false;
  debitItemFee = 0;
  debitDiscountFee = 0;
  debitTotalFee = 0;
  needPaid: number;
  disableSelectedCoupon = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
    public translate: TranslateService,
    private shareSvc: ShareService,
  ) { }

  async ngOnInit() {
    this._createForm();
    this._getListMemberDebitTransaction();
    this.listPaymentMethod = await getDataSelect(this.shareSvc.getListPaymentMethod());
    // this._getListCoupons();
  }

  private _createForm() {
    this.form = this.fb.group({
      refTransactionId: [null, Validators.required],
      couponCode: [{ value: null, disabled: this.disableSelectedCoupon }],
      paymentMethod: ['CH', Validators.required],
      paymentAmount: [0, Validators.required],
    });
  }

  public onSubmit() {
    const options = {
      type: this.manualTransactionType,
      accountId: this.userId,
    };
    console.log('🐼 => FormAddMemberTransactionsComponent => options:', options);
    if (this.form.valid) {
      this.spinner.show();
      if (this.debitTotalFee >= this.form.controls.paymentAmount.value) {
        // this.memberSvc.createMemberTransaction(Object.assign(options, this.form.getRawValue()))
        //   .subscribe(() => {
        //     this.debitItemFee = 0;
        //     this.debitTotalFee = 0;
        //     this.debitDiscountFee = 0;
        //     this.alert.success(this.translate.instant('FORM.ADD_SUCCESS'));
        //     this.closeModal.emit(true);
        //     this.activeModal.dismiss();
        //     this.spinner.hide();
        //   }, () => this.spinner.hide());
      }
      return;
    }
    this.alert.error(this.translate.instant('FORM.FORM_NOT_VALID'));
  }

  public onCancel(): void {
    this.closeModal.emit(false);
    this.activeModal.dismiss();
  }

  public updatePrice(transactionId: any) {
    this.spinner.show();
    if (transactionId) {
      // this.memberSvc.getDetailMemberDebitTransaction(transactionId).subscribe((res: any) => {
      //   if (res.data.paymentType === 'FREEZE_CONTRACT_DEBIT') {
      //     this.manualTransactionType = 'FREEZE';
      //   } else {
      //     this.manualTransactionType = 'MEMBER';
      //   }
      //   // 
      //   if (res.data) {
      //     if (!res.data.couponCode) {
      //       // this.checkValidCoupon(this.form.controls.couponCode.value);
      //       this.manualPaymentPlanTransaction = res.data.paymentPlanId;
      //       this.manualClubIdTransaction = res.data.clubId;
      //       this.debitItemFee = res.data.needPaid;
      //       this.debitTotalFee = this.debitItemFee - this.debitDiscountFee;
      //       this.needPaid = this.debitTotalFee;
      //       this.disableSelectedCoupon = false;
      //     } else {
      //       this._getCouponDetail(res.data.couponCode);
      //       this.form.controls.couponCode.patchValue(
      //         res.data.couponCode
      //       );
      //       this.debitDiscountFee = res.data.discount;
      //       this.debitItemFee = res.data.paymentTotal;
      //       this.debitTotalFee = this.debitItemFee - this.debitDiscountFee;
      //       this.needPaid = res.data.needPaid;
      //       this.disableSelectedCoupon = true;
      //     }
      //   }
      //   // Set needPaid 
      //   this.form.controls.paymentAmount.setValue(this.needPaid);
      //   this.form.controls.paymentAmount.disable();
      //   this.spinner.hide();
      // }, () => this.spinner.hide());
    }
  }

  public checkValidCoupon(couponCode: string) {
    if (couponCode) {
      this.debitDiscountFee = 0;
      this.debitTotalFee = this.debitItemFee - this.debitDiscountFee;
      const options = {
        paymentPlanId: this.manualPaymentPlanTransaction,
        couponCode: couponCode,
        paymentMethod:
          this.form.controls.paymentMethod.value,
        clubId: this.manualClubIdTransaction,
      };
      console.log('🐼 => FormAddMemberTransactionsComponent => options:', options);
      // this.couponSvc.checkValidCoupon(options).subscribe((res: any) => {
      //   if (res.data.isValidCoupon) {
      //     this.couponSvc.getCouponDetail(couponCode).subscribe((resp: any) => {
      //       if (
      //         resp.data.couponInfo.isDiscountByAmount &&
      //         resp.data.couponInfo.isDiscountByPercent
      //       ) {
      //         const discountPercent =
      //           Math.floor(
      //             (this.debitItemFee * resp.data.couponInfo.discountPercent) /
      //             100 /
      //             1000
      //           ) * 1000;
      //         const discountAmount = resp.data.couponInfo.discountAmount;
      //         if (discountPercent >= discountAmount) {
      //           this.debitDiscountFee = discountAmount;
      //           this.debitTotalFee = this.debitItemFee - this.debitDiscountFee;
      //           this.needPaid = this.debitTotalFee;
      //         } else {
      //           this.debitDiscountFee = discountPercent;
      //           this.debitTotalFee = this.debitItemFee - this.debitDiscountFee;
      //           this.needPaid = this.debitTotalFee;
      //         }
      //       } else if (resp.data.couponInfo.isDiscountByAmount) {
      //         this.debitDiscountFee = resp.data.couponInfo.discountAmount;
      //         this.debitTotalFee = this.debitItemFee - this.debitDiscountFee;
      //         this.needPaid = this.debitTotalFee;
      //       } else {
      //         this.debitDiscountFee =
      //           Math.floor(
      //             (this.debitItemFee * resp.data.couponInfo.discountPercent) /
      //             100 /
      //             1000
      //           ) * 1000;
      //         this.debitTotalFee = this.debitItemFee - this.debitDiscountFee;
      //         this.needPaid = this.debitTotalFee;
      //       }
      //     });
      //   }
      // });
    } else {
      this.debitDiscountFee = 0;
      this.debitTotalFee = this.debitItemFee;
      this.needPaid = this.debitTotalFee;
    }
  }

  private _getListMemberDebitTransaction() {
    // this.memberSvc.getListMemberDebitTransactions(this.userId).subscribe((res: any) => {
    //   this.listMemberDebitTransaction = res.data.filter(item => !item.isSubscription);
    // });
  }

  // private _getListPaymentMethod() {
  //   this.shareSvc.getListPaymentMethod().subscribe((res: any) => {
  //     this.listPaymentMethod = res.data;
  //   });
  // }

  // private _getListCoupons() {
  //   this.shareSvc.getListCoupons().subscribe((res: any) => {
  //     this.listCoupons = res.data;
  //   });
  // }

}
