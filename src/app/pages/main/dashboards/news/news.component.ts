import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isNil, omitBy } from 'lodash';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { Query } from 'src/app/core/models/share/query.model';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { getPage } from 'src/app/core/utils';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  @Input() viewDetail: any;
  // List
  listNotification = [];
  // Format
  dayFormat = SystemConstant.TIME_FORMAT.DD_MM_YY;
  timeFormat = SystemConstant.TIME_FORMAT.HH_MM;
  dateLimit = SystemConstant.DATE_RANGE.DATE_LIMIT;

  // // Pagination
  total: number;
  pages: number;
  page = SystemConstant.PAGING.PAGES;
  pageSize = SystemConstant.PAGING.PAGESIZE;
  // Query
  now = new Date().toISOString().split('T')[0];
  today: any = moment().format('YYYY-MM-DD');
  startDate: moment.Moment;
  endDate: moment.Moment;
  serviceStatus
  paymentStatus
  clubId: number;
  deliveryMethod: number;
  paymentMethod: string;
  // single date picker 
  renderFilter = true;
  defaultDateWithoutPermission = new Date().toISOString().split('T')[0]
  maxDate = new Date().toISOString().split('T')[0];
  minDate = moment().subtract(6, 'd').format('YYYY-MM-DD');
  startDateWithoutPermission = new Date().toISOString().split('T')[0] + ' 00:00:00';
  endDateWithoutPermission = new Date().toISOString().split('T')[0] + ' 23:59:59';
  // Type export 
  typeExport: string;

  constructor(
    private spinner: NgxSpinnerService,
    private newsSv: NotificationService,
    public translate: TranslateService,
  ) {
  }

  async ngOnInit() {
    this.getListNotification();
  }


  public onChangePage(page: number) {
    if (page) {
      this.page = page;
      this.getListNotification();
    }
  }

  public loadNext(page: number) {
    this.page = page;
    // this.getListNotification();
  }

  public onChangeLimit() {
    this.page = 1;
    // this.getListNotification();
  }

  public getListNotification(options: Query = {}) {
    // this.spinner.show();
    options = {
      order: 'DESC',
      page: this.page,
      limit: this.pageSize
    };
    this.newsSv.getListNotification(omitBy(options, isNil)).subscribe((res: any) => {
      this.total = res.data.total;
      this.pages = getPage(this.total, this.pageSize);
      this.listNotification = res.data.result;
      this.spinner.hide();
    }, () => this.spinner.hide());
  }

}


