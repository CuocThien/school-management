import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { NotificationService } from 'src/app/core/services/notification/notification.service';


@Component({
  selector: 'app-form-add-edit-news',
  templateUrl: './form-add-edit-news.component.html',
  styleUrls: ['./form-add-edit-news.component.scss']
})
export class FormAddEditNewsComponent implements OnInit {

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;
  @Input() action: string;
  @Input() notification: any;

  constructor(
    private spinner: NgxSpinnerService,
    private newsSv: NotificationService,
    private fb: FormBuilder,
    private alert: ToastrService,
    public activeModal: NgbActiveModal,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    this._createForm();
  }

  private _createForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required]],
      targetType: [null, [Validators.required]],
    });
    if (this.action === SystemConstant.ACTION.EDIT) {
      this._patchValue(this.notification);
    }
  }

  private _patchValue(notification: any) {
    this.form.patchValue({
      title: notification.title,
      description: notification.description,
      targetType: notification.targetType,
    });
  }

  public onSubmit() {
    this.spinner.show();
    const actionType = {
      CREATE: () => {
        this.newsSv.createNotification(this.form.value)
          .subscribe(() => {
            this.alert.success(this.translate.instant('FORM.ADD_SUCCESS'));
            this.closeModal.emit(true);
            this.activeModal.dismiss();
            this.spinner.hide();
          }, () => this.spinner.hide());
        return;
      },
      EDIT: () => {
        this.newsSv.updateNotification(this.notification.id, this.form.value)
          .subscribe(() => {
            this.alert.success(this.translate.instant('FORM.UPDATE_SUCCESS'));
            this.closeModal.emit(true);
            this.activeModal.dismiss();
            this.spinner.hide();
          }, () => this.spinner.hide());
        return;
      }
    };
    if (this.form.valid) {
      return actionType[this.action]();
    }
    this.alert.error(this.translate.instant('FORM.FORM_NOT_VALID'));
    this.spinner.hide();
  }

  public onCancel() {
    this.closeModal.emit(false);
    this.activeModal.dismiss();
  }

}
