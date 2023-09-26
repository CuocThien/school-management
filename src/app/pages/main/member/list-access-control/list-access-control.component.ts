import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { Query } from 'src/app/core/models/share/query.model';
import { AuthenticationService } from 'src/app/core/services/common/auth.service';
import { ShareService } from 'src/app/core/services/share/share.service';
import { getDataSelect, getTimeFormat } from 'src/app/core/utils';

@Component({
  selector: 'app-list-access-control',
  templateUrl: './list-access-control.component.html',
  styleUrls: ['./list-access-control.component.scss']
})
export class ListAccessControlComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private shareSvc: ShareService,
    private authSvc: AuthenticationService,
    public translate: TranslateService
  ) { }

  selectedClub: number;
  isDisableSelected: boolean;
  selectedDateTime: {
    startDate: moment.Moment;
    endDate: moment.Moment;
  };
  dateLimit = SystemConstant.DATE_RANGE.DATE_LMIT_30;
  startDate: moment.Moment = null;
  endDate: moment.Moment = null;
  dateFormat = SystemConstant.TIME_FORMAT.DD_MM_YY;
  timeFormat = SystemConstant.TIME_FORMAT.HH_MM_SS;
  searchValue: string;
  clubId: number;
  listAccessControl = [];
  listClub = [];
  page = SystemConstant.PAGING.PAGES;
  pageSize = SystemConstant.PAGING.PAGESIZE;
  total: number;
  pages: number;

  async ngOnInit() {
    this.listClub = await (getDataSelect(this.shareSvc.getListStores()));
    this._getDataByRole();
  }

  private _getDataByRole() {
    const userInfo = this.authSvc.getUserProfileLocal();
    if (userInfo.clubId) {
      this.clubId = userInfo.clubId;
      this.selectedClub = userInfo.clubId;
      this.isDisableSelected = !this.isDisableSelected;
    }
    this.getListAccessControl();
  }

  public onSearch() {
    this.page = 1;
    this.getListAccessControl();
  }

  public onChangeClub(selectedClub: number) {
    if (![undefined, this.clubId].includes(selectedClub)) {
      this.clubId = selectedClub;
      this.page = 1;
      this.getListAccessControl();
    }
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
    this.getListAccessControl();
  }

  public onChangeLimit() {
    this.page = 1;
    this.getListAccessControl();
  }

  public loadNext(page: number) {
    this.page = page;
    this.getListAccessControl();
  }

  public viewDetail(accountId: string, event: any, accountType: string) {

    const url = {
      MEMBER: UrlConstant.ROUTE.MAIN.CLUB_MEMBERS + `/${accountId}`,
      EMPLOYEE: UrlConstant.ROUTE.MAIN.STAFF + `/${accountId}`,
      GM: UrlConstant.ROUTE.MAIN.EMPLOYEES_LIST_GM + `/${accountId}`,
      LEADER: UrlConstant.ROUTE.MAIN.EMPLOYEES_LIST_PT_LEADER + `/${accountId}`,
      PT: UrlConstant.ROUTE.MAIN.EMPLOYEES_LIST_PT + `/${accountId}`,
    };

    return event.ctrlKey ? window.open(url[accountType], '_blank') : this.router.navigate([url[accountType]]);
  }

  public getListAccessControl(options?: Query) {
    console.log('🐼 => ListAccessControlComponent => options:', options);
    this.spinner.show();
    options = {
      queryString: this.searchValue,
      clubId: this.clubId,
      startDate: getTimeFormat(this.startDate),
      endDate: getTimeFormat(this.endDate),
      page: this.page,
      limit: this.pageSize
    };
    // this.memberSvc.getListAccessControl(omitBy(options, isNil)).pipe(finalize(() => this.spinner.hide())).subscribe((res: any) => {
    //   this.listAccessControl = res.data.result;
    //   this.total = res.data.total;
    //   this.pages = getPage(this.total, this.pageSize);
    // });
  }

}
