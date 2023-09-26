import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MemberService } from 'src/app/core/services/member/member.service';
import { ImagesService } from 'src/app/core/services/images/images.service';
import { ImageOptions } from 'src/app/core/models/share/image.model';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-form-confirm-request-change-type',
  templateUrl: './form-confirm-request-change-type.component.html',
  styleUrls: ['./form-confirm-request-change-type.component.scss']
})
export class FormConfirmRequestChangeTypeComponent implements OnInit {
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;
  @Input() requestId: string;
  @Input() fileUploaded: string;
  imgUrl: string;
  imageData: any;
  config: DropzoneConfigInterface = {
    maxFilesize: 50,
    acceptedFiles: 'image/*',
    maxFiles: 1,
    thumbnailWidth: 200,
    // addRemoveLinks: true,
    thumbnailHeight: 100,
    uploadMultiple: false,
    init: function () {
      this.on('addedfile', (file) => {
        if (!['image/jpeg', 'image/jpg', 'image/png', 'image/gif', undefined].includes(file.type)) {
          this.removeFile(file);
        }
        if (this.files[1]) {
          this.removeFile(this.files[0]);
        }
      });
    }
  };
  listStatus = [
    {
      value: 'APRROVED',
      nameEn: 'Approved',
      nameVi: 'Đồng ý'
    },
    {
      value: 'REJECTED',
      nameEn: 'Rejected',
      nameVi: 'Từ chối'
    }
  ]
  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private memberService: MemberService,
    private imgSvc: ImagesService,
    private alert: ToastrService,
    private spinner: NgxSpinnerService,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    this._createForm();
  }
  private _createForm() {
    this.form = this.fb.group({
      status: ['APPROVED', Validators.required],
      rejectReason: [''],
    });
    this.form.get('rejectReason').disable();
    this.spinner.hide();
  }

  public async onSubmit() {
    this.spinner.show();
    const body = {
      status: this.form.value.status,
      rejectReason: this.form.value.rejectReason
    };
    if (this.form.valid) {
      if (body.status == 'APPROVED') body.rejectReason = '';
      this.memberService.updateRequestMemberType(this.requestId, body).subscribe(() => {
        this.alert.success(this.translate.instant('FORM.UPDATE_SUCCESS'));
        this.closeModal.emit(true);
        this.activeModal.dismiss();
      }, () => this.spinner.hide());
      return;
    }
    this.alert.error(this.translate.instant('FORM.FORM_NOT_VALID'));
    this.spinner.hide();
  }
  public onCancel() {
    this.closeModal.emit(false);
    this.activeModal.dismiss();
  }

  public changeStatus(status: any) {
    if (status == 'REJECTED') {
      this.form.get('rejectReason').enable();
      return;
    }
    this.form.get('rejectReason').setValue('');
    this.form.get('rejectReason').disable();
  }

  public dropzoneInit(event: any) {
    const imgOptions: ImageOptions = {
      id: this.fileUploaded
    };
    this.imgUrl = this.imgSvc.getImage(imgOptions);
    const mockFile = { name: 'student card photo', size: '50' };
    event.emit('addedfile', mockFile);
    event.emit('thumbnail', mockFile, this.imgUrl);
    event.emit('complete', mockFile);
    event.files.push(mockFile);
  }

  public dropzoneThumbnailfile(event: any) {
    this.imageData = event[0];
  }
}
