import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Store } from 'src/app/core/models/share/store.model';
import { ShareService } from 'src/app/core/services/share/share.service';
import { PaymentMethod } from 'src/app/core/models/share/payment-method.model';
import { SystemConstant } from 'src/app/core/constants/system.constant';

@Component({
  selector: 'app-form-add-member-contract',
  templateUrl: './form-add-member-contract.component.html',
  styleUrls: ['./form-add-member-contract.component.scss']
})
export class FormAddMemberContractComponent implements OnInit {
  @Input() action: string;
  @Input() userId: any;
  @Input() memberType: any;
  @Input() order: any;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;
  // 
  listStore: Store[] = [];
  listDeliveryMethod = [];
  listLaundryPackage = [];
  listPaymentMethod: PaymentMethod[] = [];
  listCoupon = [];
  // 

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private alert: ToastrService,
    public translate: TranslateService,
    private shareSvc: ShareService,
  ) { }

  ngOnInit(): void {
    this._createForm();
  }


  private _getListPaymentMethod() {
    this.shareSvc.getListPaymentMethod().subscribe((res: any) => {
      this.listPaymentMethod = res.data.result;
    });
  }

  private _getListClub() {
    this.shareSvc.getListStores().subscribe((res: any) => {
      this.listStore = res.data.result;
    });
  }

  private _getListLaundryPackage() {
    this.shareSvc.listLaundryPackageForMember({ memberType: this.memberType }).subscribe((res: any) => {
      this.listLaundryPackage = res.data.result;
    });
  }

  private _getListDeliveryMethod() {
    this.shareSvc.getListDeliveryMethod().subscribe((res: any) => {
      this.listDeliveryMethod = res.data.result;
    });
  }

  private _getListCoupon() {
    // this.memberSvc.getListMemberCoupons(this.userId).subscribe((res: any) => {
    //   this.listCoupon = res.data.result;
    // });
  }


  private _createForm() {
    this._getListClub();
    this._getListCoupon();
    this._getListPaymentMethod();
    this._getListLaundryPackage();
    this._getListDeliveryMethod();
    this.form = this.fb.group({
      storeId: [null, Validators.required],
      couponCode: [null],
      address: [null],
      laundryPackageId: [null, [Validators.required]],
      deliveryMethodId: [null, [Validators.required]],
      preorderPaymentMethod: [null, [Validators.required]],
      accountId: [this.userId, Validators.required],
    });
    if (this.action === SystemConstant.ACTION.EDIT) {
      this._patchValue(this.order);
    }
  }

  private _patchValue(order: any) {
    this.form.patchValue({
      storeId: Number(order.storeId),
      couponCode: order.couponCode,
      address: order.address.address,
      laundryPackageId: order.laundryPackageId,
      deliveryMethodId: order.deliveryMethodId,
      preorderPaymentMethod: order.preorderPaymentMethod,
    });
  }

  public onSubmit() {
    if (this.form.valid) {
      this.spinner.show();
      const actionType = {
        CREATE: () => {
          // this.memberSvc.createMemberOrder(body)
          //   .subscribe(() => {
          //     this.alert.success(this.translate.instant('FORM.ADD_SUCCESS'));
          //     this.closeModal.emit(true);
          //     this.activeModal.dismiss();
          //     this.spinner.hide();
          //   }, () => this.spinner.hide());
          return;
        },
        EDIT: () => {
          // this.memberSvc.updateMemberOrder(this.order.id, body)
          //   .subscribe(() => {
          //     this.alert.success(this.translate.instant('FORM.UPDATE_SUCCESS'));
          //     this.closeModal.emit(true);
          //     this.activeModal.dismiss();
          //     this.spinner.hide();
          //   }, () => this.spinner.hide());
          return;
        }
      };
      const body = {
        ...this.form.value,
        arriveAt: new Date(),
        address: {
          lat: '',
          lng: '',
          address: this.form.value.address
        }
      };
      console.log('🐼 => FormAddMemberContractComponent => body:', body);
      return actionType[this.action]();
    }
    this.alert.error(this.translate.instant('FORM.FORM_NOT_VALID'));
    this.spinner.hide();
  }

  public onCancel(): void {
    this.closeModal.emit(false);
    this.activeModal.dismiss();
  }

}
