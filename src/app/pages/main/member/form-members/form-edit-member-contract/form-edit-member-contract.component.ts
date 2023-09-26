import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { Store } from 'src/app/core/models/share/store.model';
import { LaundryPackage } from 'src/app/core/models/share/laundry-package.model';
import { ShareService } from 'src/app/core/services/share/share.service';
import { formatDate, getDataSelect } from 'src/app/core/utils';

@Component({
  selector: 'app-form-edit-member-contract',
  templateUrl: './form-edit-member-contract.component.html',
  styleUrls: ['./form-edit-member-contract.component.scss'],
})
export class FormEditMemberContractComponent implements OnInit {
  @Input() contractId: string;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;
  //
  listClub: Store[] = [];
  listPaymentPlan: LaundryPackage[] = [];
  contractDetail: any;
  timeFormat = SystemConstant.TIME_FORMAT.HH_MM_SS;
  dateFormat = SystemConstant.TIME_FORMAT.YY_MM_DD;
  listStatus = [
    SystemConstant.STATUS.CURRENT,
    SystemConstant.STATUS.PAST,
    SystemConstant.STATUS.WAITFORPAYMENT,
    SystemConstant.STATUS.FUTURE,
  ];

  constructor(
    private spinner: NgxSpinnerService,
    private shareSvc: ShareService,
    private alert: ToastrService,
    private fb: FormBuilder,
    public translate: TranslateService,
    public activeModal: NgbActiveModal
  ) { }

  async ngOnInit() {
    this.listClub = await getDataSelect(this.shareSvc.getListStores());
    this._getContractDetailById();
    this._createForm();
  }

  public async onChangeClub() {
    this.form.get('paymentPlanId').setValue('');
    this.listPaymentPlan = await getDataSelect(
      this.shareSvc.getListLaundryPackage()
    );
  }

  private _getContractDetailById() {
    this.spinner.show();
    // this.employeesSvc.getMemberContractDetailById(this.contractId).subscribe(
    //   async (res: any) => {
    //     this.contractDetail = res.data;
    //     // const { clubId } = res.data;
    //     if (res) {
    //       this.listPaymentPlan = await getDataSelect(
    //         this.shareSvc.getListLaundryPackage()
    //       );
    //       this._patchValue();
    //     }
    //     this.spinner.hide();
    //   },
    //   () => this.spinner.hide()
    // );
  }

  private _createForm(): void {
    this.form = this.fb.group({
      signDate: ['', Validators.required],
      signTime: ['', Validators.required],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      createDate: [''],
      createTime: ['', Validators.required],
      endDate: ['', Validators.required],
      endTime: ['', Validators.required],
      status: [null, Validators.required],
      clubId: [null, Validators.required],
      paymentPlanId: [null, Validators.required],
    });
  }

  /*   private _patchValue() {
      this.form.patchValue({
        id: this.contractDetail.id,
        signDate: moment(this.contractDetail.signDate).format(this.dateFormat),
        signTime: moment(this.contractDetail.signDate).format(this.timeFormat),
        startDate: moment(this.contractDetail.startDate).format(this.dateFormat),
        startTime: moment(this.contractDetail.startDate).format(this.timeFormat),
        createDate: moment(this.contractDetail.createdAt).format(this.dateFormat),
        createTime: moment(this.contractDetail.createdAt).format(this.timeFormat),
        endDate: moment(this.contractDetail.endDate).format(this.dateFormat),
        endTime: moment(this.contractDetail.endDate).format(this.timeFormat),
        status: this.contractDetail.status,
        clubId: this.contractDetail.clubId,
        paymentPlanId: this.contractDetail.paymentPlanId,
      });
    } */

  public editMemberContract() {
    this.spinner.show();
    const form = this.form.controls;
    if (this.form.valid) {
      const options = {
        contractId: this.contractId,
        signDate: formatDate(form.signDate, form.signTime),
        startDate: formatDate(form.startDate, form.startTime),
        endDate: formatDate(form.endDate, form.endTime),
        status: form.status.value,
        clubId: form.clubId.value,
        paymentPlanId: form.paymentPlanId.value,
      };
      console.log('🐼 => FormEditMemberContractComponent => options:', options);
      // this.employeesSvc.editMemberContract(this.contractId, options).subscribe(
      //   (res: any) => {
      //     if (res) {
      //       this.activeModal.dismiss();
      //       this.closeModal.emit(true);
      //       this.alert.success(this.translate.instant('FORM.UPDATE_SUCCESS'));
      //     }
      //     this.spinner.hide();
      //   },
      //   () => this.spinner.hide()
      // );
      return;
    }
    this.spinner.hide();
    this.alert.error(this.translate.instant('FORM.FORM_NOT_VALID'));
  }

  public onCancel() {
    this.activeModal.dismiss();
    this.closeModal.emit(false);
  }
}
