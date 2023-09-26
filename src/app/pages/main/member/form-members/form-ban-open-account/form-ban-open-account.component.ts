import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-form-ban-open-account',
  templateUrl: './form-ban-open-account.component.html',
  styleUrls: ['./form-ban-open-account.component.scss']
})
export class FormBanOpenAccountComponent implements OnInit {
  @Input() userId: string;
  @Input() isDeletedUser: string;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  // 
  form: FormGroup;
  currentLang: any;

  constructor(
    private spinner: NgxSpinnerService,
    private activeModal: NgbActiveModal,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    return;
  }

  public onSubmit() {
    this.spinner.show();
    if (!this.isDeletedUser) {
      // this.memberSv.banAccount(this.userId, {}).subscribe(
      //   () => {
      //     this.alert.success(this.translate.instant('FORM.DELETE_SUCCESS'));
      //     this.closeModal.emit(true);
      //     this.activeModal.dismiss();
      //     this.spinner.hide();
      //   },
      //   (err) => this.alert.error(this.errorSvc.getServerErrorMessage(err))
      // );
      this.spinner.hide();
      return;
    }
    // this.memberSv.openAccount(this.userId, {}).subscribe(
    //   () => {
    //     this.alert.success(this.translate.instant('FORM.UPDATE_SUCCESS'));
    //     this.closeModal.emit(true);
    //     this.activeModal.dismiss();
    //     this.spinner.hide();
    //   },
    //   () => this.spinner.hide()
    // );
    return;
  }

  public onCancel(): void {
    this.closeModal.emit(false);
    this.activeModal.dismiss();
  }
}
