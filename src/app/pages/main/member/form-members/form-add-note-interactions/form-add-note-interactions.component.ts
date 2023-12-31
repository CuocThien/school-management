import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SystemConstant } from 'src/app/core/constants/system.constant';

@Component({
  selector: 'app-form-add-note-interactions',
  templateUrl: './form-add-note-interactions.component.html',
  styleUrls: ['./form-add-note-interactions.component.scss']
})
export class FormAddNoteInteractionsComponent implements OnInit {
  @Input() userId: string;
  @Input() note: any;
  @Input() action: string;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private alert: ToastrService,
    private activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    this._createForm();
  }

  private _createForm() {
    this.form = this.fb.group({
      accountId: [this.userId, [Validators.required]],
      note: [null, [Validators.required]],
    });
    if (this.action === SystemConstant.ACTION.EDIT) {
      this._patchValue(this.note);
    }
  }

  private _patchValue(data: any) {
    this.form.patchValue({
      accountId: this.userId,
      note: data.note
    });
  }

  public onSubmit() {
    this.spinner.show();
    const actionType = {
      CREATE: () => {
        // this.memberSvc.addNote(this.form.value)
        //   .subscribe(() => {
        //     this.alert.success(this.translate.instant('FORM.ADD_SUCCESS'));
        //     this.closeModal.emit(true);
        //     this.activeModal.dismiss();
        //     this.spinner.hide();
        //   }, () => this.spinner.hide());
      },
      EDIT: () => {
        // this.memberSvc.editNote(this.note.id, this.form.value)
        //   .subscribe(() => {
        //     this.alert.success(this.translate.instant('FORM.UPDATE_SUCCESS'));
        //     this.closeModal.emit(true);
        //     this.activeModal.dismiss();
        //     this.spinner.hide();
        //   }, () => this.spinner.hide());
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
