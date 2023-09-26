import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { Query } from 'src/app/core/models/share/query.model';
import { getTimeFormat } from 'src/app/core/utils';
import { MemberTabChangeDetailComponent } from '../member-tab/member-tab-change-detail/member-tab-change-detail.component';
@Component({
  selector: 'app-list-account-change-log',
  templateUrl: './list-account-change-log.component.html',
  styleUrls: ['./list-account-change-log.component.scss']
})
export class ListAccountChangeLogComponent implements OnInit {


  listAccountChange = [];

  listTypeUpdate = [
    'UPDATE_INFO',
    'UPDATE_FINGER',
    'UPDATE_EMAIL_PHONE',
    'SET_PASSWORD',
    'CHANGE_PASSWORD',
    'ACTIVE_ACCOUNT',
    'DELETE_ACCOUNT'
  ]

  now = new Date().toISOString().split('T')[0];
  today: any = moment().format('YYYY-MM-DD');
  startDate: moment.Moment = null;
  endDate: moment.Moment = null;
  dateFormat = SystemConstant.TIME_FORMAT.DD_MM_YY;
  timeFormat = SystemConstant.TIME_FORMAT.HH_MM_SS;
  searchValue: string;
  selectUpdateType: string;
  selectedDateTime: {
    startDate: moment.Moment;
    endDate: moment.Moment;
  };

  page = SystemConstant.PAGING.PAGES;
  pageSize = SystemConstant.PAGING.PAGESIZE;
  pages: number
  total: number;

  constructor(
    private spinner: NgxSpinnerService,
    private modalSvc: NgbModal,
    public translate: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.getListAccountChangeLogs();
  }

  public onSearch() {
    this.page = 1;
    this.getListAccountChangeLogs();
  }

  public onChangeUpdateType(event: any) {
    this.selectUpdateType = event;
    this.page = 1;
    this.getListAccountChangeLogs();
  }

  public onFilterDateChange(selectedCreatedDate: any) {
    const { startDate, endDate } = selectedCreatedDate;
    const sdIsOldValue = [this.startDate].includes(startDate);
    const edIsOldvalue = [this.endDate].includes(endDate);
    if (sdIsOldValue && edIsOldvalue) {
      return;
    }
    this.startDate = startDate;
    this.endDate = endDate;
    this.page = 1;
    this.getListAccountChangeLogs();
  }


  public onChangeLimit() {
    this.page = 1;
    this.getListAccountChangeLogs();
  }

  public loadNext(page: number) {
    this.page = page;
    this.getListAccountChangeLogs();
  }


  public getListAccountChangeLogs(options?: Query) {
    console.log('🐼 => ListAccountChangeLogComponent => options:', options);
    this.spinner.show();
    options = {
      queryString: this.searchValue,
      updateType: this.selectUpdateType,
      startDate: getTimeFormat(this.startDate),
      endDate: getTimeFormat(this.endDate),
      page: this.page,
      limit: this.pageSize
    };
    // this.memberSvc.getListAccountChangeLog(omitBy(options, isNil))
    //   .pipe(finalize(() => this.spinner.hide()))
    //   .subscribe((res: any) => {
    //     this.listAccountChange = res.data.result;
    //     this.total = res.data.total;
    //     this.pages = getPage(this.total, this.pageSize);
    //   });
  }

  public viewDetail(data: any) {
    const modalRef = this.modalSvc.open(MemberTabChangeDetailComponent, {
      centered: true,
      size: 'lg',
      backdrop: true,
    });
    modalRef.componentInstance.bodyUpdate = data;
  }

}
