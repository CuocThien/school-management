import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { SystemConstant } from 'src/app/core/constants/system.constant';


@Component({
  selector: 'app-view-detail-notification',
  templateUrl: './view-detail-notification.component.html',
  styleUrls: ['./view-detail-notification.component.scss']
})
export class ViewDetailNotificationComponent {
  // Format
  dayFormat = SystemConstant.TIME_FORMAT.DD_MM_YY;
  timeFormat = SystemConstant.TIME_FORMAT.HH_MM;

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() notification: any;

  constructor(
    public activeModal: NgbActiveModal,
    public translate: TranslateService
  ) { }

  public onCancel() {
    this.closeModal.emit(false);
    this.activeModal.dismiss();
  }

}
