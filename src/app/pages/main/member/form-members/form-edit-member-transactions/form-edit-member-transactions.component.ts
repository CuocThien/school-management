import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { PaymentMethod } from 'src/app/core/models/share/payment-method.model';
import { ShareService } from 'src/app/core/services/share/share.service';
import { formatDate } from 'src/app/core/utils';

@Component({
  selector: 'app-form-edit-member-transactions',
  templateUrl: './form-edit-member-transactions.component.html',
  styleUrls: ['./form-edit-member-transactions.component.scss'],
})
export class FormEditMemberTransactionsComponent implements OnInit {
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  @Input() memberTransactions: any;
  form: FormGroup;
  listPaymentMethod: PaymentMethod[] = [];
  listCouponCode = [];
  timeFormat = SystemConstant.TIME_FORMAT.HH_MM_SS;
  dateFormat = SystemConstant.TIME_FORMAT.YY_MM_DD;
  isValidTransactionAmount = true;

  constructor(
    private shareSvc: ShareService,
    public translate: TranslateService,
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
  ) { }

  async ngOnInit() {
    this._createForm();
    this._getListDataForEdit();
  }

  private _createForm(): void {
    this.form = this.fb.group({
      sellerName: [{ value: '', disabled: true }, Validators.required],
      paymentType: [{ value: '', disabled: true }, Validators.required],
      couponCodeId: [null],
      discount: ['', Validators.required],
      transactionAmount: ['', Validators.required],
      paymentTotal: [{ value: '', disabled: true }, Validators.required],
      purchaseDate: ['', Validators.required],
      purchaseTime: ['', Validators.required],
      status: [{ value: '', disabled: true }, Validators.required],
      paymentMethod: ['', Validators.required],
    });
  }

  private _patchValue(): void {
    this.form.patchValue({
      sellerName: this.memberTransactions.sellerName,
      paymentType: this.memberTransactions.paymentType,
      couponCodeId: this.memberTransactions.couponCodeId,
      discount: this.memberTransactions.discount,
      transactionAmount: this.memberTransactions.transactionAmount,
      paymentTotal: this.memberTransactions.paymentTotal,
      purchaseDate: moment(this.memberTransactions.purchaseDate).format(
        this.dateFormat
      ),
      purchaseTime: moment(this.memberTransactions.purchaseDate).format(
        this.timeFormat
      ),
      status: this.memberTransactions.status,
      paymentMethod: this.memberTransactions.paymentMethod,
    });
  }

  private async _getListDataForEdit() {
    this.spinner.show();
    const [listPaymentMethod, listCouponCode]: [any, any] = await Promise.all([
      this.shareSvc.getListPaymentMethod().toPromise(),
      this.shareSvc.getListCoupons().toPromise(),
    ]);
    this.listPaymentMethod = listPaymentMethod.data;
    this.listCouponCode = listCouponCode.data;
    if (this.listPaymentMethod && this.listCouponCode) {
      this._patchValue();
    }
    this.spinner.hide();
  }

  public onChangeAmount() {
    const transactionAmount = this.form.get('transactionAmount').value;
    if (transactionAmount > this.memberTransactions.paymentTotal) {
      this.isValidTransactionAmount = false;
      return this.alert.error(
        this.translate.instant(
          'FORM.TRANSACTIONS_AMOUNT_NOT_GREATER_PAYMENT_TOTAL'
        )
      );
    }
    this.isValidTransactionAmount = true;
  }

  public onSubmitEditTransaction() {
    if (!this.isValidTransactionAmount) {
      return this.alert.error(
        this.translate.instant(
          'FORM.TRANSACTIONS_AMOUNT_NOT_GREATER_PAYMENT_TOTAL'
        )
      );
    }
    if (this.form.valid) {
      this.spinner.show();
      const form = this.form.controls;
      const options = {
        purchaseDate: formatDate(form.purchaseDate, form.purchaseTime),
        status: form.status.value,
        sellerName: form.sellerName.value,
        paymentType: form.paymentType.value,
        couponCodeId: form.couponCodeId.value,
        discount: form.discount.value,
        transactionAmount: form.transactionAmount.value,
        paymentTotal: form.paymentTotal.value,
        paymentMethod: form.paymentMethod.value,
      };
      console.log('🐼 => FormEditMemberTransactionsComponent => options:', options);
      // this.employeesSvc
      //   .editMemberTransactions(this.memberTransactions.id, options)
      //   .subscribe(
      //     (res: any) => {
      //       if (res) {
      //         this.activeModal.dismiss();
      //         this.closeModal.emit(true);
      //         this.alert.success(this.translate.instant('FORM.UPDATE_SUCCESS'));
      //       }
      //       this.spinner.hide();
      //     },
      //     () => this.spinner.hide()
      //   );
      return;
    }
    this.spinner.hide();
    this.alert.error(this.translate.instant('FORM.FORM_NOT_VALID'));
  }

  public onCancel() {
    this.closeModal.emit(false);
    this.activeModal.dismiss();
  }
}
