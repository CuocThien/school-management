
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { Query } from 'src/app/core/models/share/query.model';
import { FormConfirmBoxComponent } from 'src/app/shared/forms/form-confirm-box/form-confirm-box.component';
import { FormAddNoteInteractionsComponent } from '../../form-members/form-add-note-interactions/form-add-note-interactions.component';


@Component({
  selector: 'app-member-tab-interactions',
  templateUrl: './member-tab-interactions.component.html',
  styleUrls: ['./member-tab-interactions.component.scss']
})
export class MemberTabInteractionsComponent implements OnInit {
  @Input() userId: string;
  listNote = [];
  timeFormat = SystemConstant.TIME_FORMAT;

  constructor(
    private spinner: NgxSpinnerService,
    private modalSvc: NgbModal,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.getMemberInteractions();
  }

  private _deleteNote(noteId: string) {
    console.log('🐼 => MemberTabInteractionsComponent => noteId:', noteId);
    this.spinner.show();
    // this.memberSvc.deletNote(noteId).subscribe(res => {
    //   if (res) {
    //     this.alert.success(this.translate.instant('FORM.DELETE_SUCCESS'));
    //     this.getMemberInteractions();
    //     this.spinner.hide();
    //   }
    // }, () => this.spinner.hide());
  }

  public addNotes() {
    const modalRef = this.modalSvc.open(FormAddNoteInteractionsComponent, {
      centered: true,
      size: 'md',
      backdrop: true,
    });
    modalRef.componentInstance.userId = this.userId;
    modalRef.componentInstance.action = SystemConstant.ACTION.CREATE;
    modalRef.componentInstance.closeModal.subscribe((res) => {
      return res ? this.getMemberInteractions({ accountId: this.userId }) : {};
    });
  }

  public editNotes(note: any) {
    const modalRef = this.modalSvc.open(FormAddNoteInteractionsComponent, {
      centered: true,
      size: 'md',
      backdrop: true,
    });
    modalRef.componentInstance.userId = this.userId;
    modalRef.componentInstance.note = note;
    modalRef.componentInstance.action = SystemConstant.ACTION.EDIT;
    modalRef.componentInstance.closeModal.subscribe((res) => {
      return res ? this.getMemberInteractions({ accountId: this.userId }) : {};
    });
  }

  public deleteNotes(noteId: string) {
    const modalRef = this.modalSvc.open(FormConfirmBoxComponent, {
      centered: true,
      size: 'md',
      backdrop: true,
    });
    modalRef.componentInstance.title = 'FORM.DELETE_NOTE';
    modalRef.componentInstance.closeModal.subscribe((res) => {
      return res ? this._deleteNote(noteId) : {};
    });
  }


  public getMemberInteractions(options?: Query) {
    console.log('🐼 => MemberTabInteractionsComponent => options:', options);
    this.spinner.show();
    options = {
      accountId: this.userId,
    };
    // this.memberSvc.getMemberInteractions(omitBy(options, isNil)).subscribe((res: any) => {
    //   this.listNote = res.data;
    //   this.spinner.hide();
    // }, () => this.spinner.hide());
  }
}
