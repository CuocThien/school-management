import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { Query } from 'src/app/core/models/share/query.model';
import { AuthenticationService } from 'src/app/core/services/common/auth.service';
import { ShareService } from 'src/app/core/services/share/share.service';
import { getDataSelect, } from 'src/app/core/utils';
@Component({
  selector: 'app-list-now-in-club',
  templateUrl: './list-now-in-club.component.html',
  styleUrls: ['./list-now-in-club.component.scss']
})
export class ListNowInClubComponent implements OnInit {

  listNowInClub = [];
  listClub = []
  searchValue: string;
  selectedClub: number;
  clubId: number;
  isDisableSelected: boolean;
  page = SystemConstant.PAGING.PAGES;
  pageSize = SystemConstant.PAGING.PAGESIZE;
  pages: number
  total: number;

  dayFormat = SystemConstant.TIME_FORMAT.DD_MM_YY;
  timeFormat = SystemConstant.TIME_FORMAT.HH_MM_SS;

  constructor(
    private spinner: NgxSpinnerService,
    private shareSvc: ShareService,
    private authSvc: AuthenticationService,
    private router: Router,
    public translate: TranslateService
  ) { }


  async ngOnInit() {
    this.listClub = await getDataSelect(this.shareSvc.getListStores());
    this._getDataByRole();
  }

  private _getDataByRole() {
    const userInfo = this.authSvc.getUserProfileLocal();
    if (userInfo.clubId) {
      this.clubId = userInfo.clubId;
      this.selectedClub = userInfo.clubId;
      this.isDisableSelected = !this.isDisableSelected;
    }
    this.getListNowInClub();
  }

  public getListNowInClub(options?: Query) {
    this.spinner.show();
    options = {
      queryString: this.searchValue,
      clubId: this.clubId,
      page: this.page,
      limit: this.pageSize,
    };
    console.log('🐼 => ListNowInClubComponent => options:', options);
    // this.memberSvc.getListMemberNowinClub(omitBy(options, isNil)).pipe(finalize(() => this.spinner.hide())).subscribe((res: any) => {
    //   this.listNowInClub = res.data.result;
    //   this.total = res.data.total;
    //   this.pages = getPage(this.total, this.pageSize);
    // });
  }

  public onChangeClub(selectedClub: number) {
    if (![undefined, this.clubId].includes(selectedClub)) {
      this.clubId = selectedClub;
      this.page = 1;
      this.getListNowInClub();
    }
  }

  public onSearch() {
    this.page = 1;
    this.getListNowInClub();
  }

  public loadNext(page: number) {
    this.page = page;
    this.getListNowInClub();
  }

  public onChangeLimit() {
    this.page = 1;
    this.getListNowInClub();
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

}
