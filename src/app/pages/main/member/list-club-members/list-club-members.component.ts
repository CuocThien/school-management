import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { Store } from 'src/app/core/models/share/store.model';
import { Query } from 'src/app/core/models/share/query.model';
import { AuthenticationService } from 'src/app/core/services/common/auth.service';

@Component({
  selector: 'app-list-club-members',
  templateUrl: './list-club-members.component.html',
  styleUrls: ['./list-club-members.component.scss'],
})
export class ListClubMembersComponent implements OnInit {
  listClub: Store[] = [];
  objListClub = {};
  listClubMember = [];
  listStatus = [
    {
      value: 1,
      name: 'ACTIVE'
    },
    {
      value: 0,
      name: 'INACTIVE'
    }
  ];
  listChannels = [
    {
      value: 'APP',
      name: 'APP'
    },
    {
      value: 'POS',
      name: 'POS'
    },
  ];
  // Filter
  selectedChannel: string;
  selectedStatus: number;
  isDisableSelected: boolean;
  // Pagination
  total: number;
  pages: number;
  page = SystemConstant.PAGING.PAGES;
  pageSize = SystemConstant.PAGING.PAGESIZE;
  // Query
  searchValue = '';
  clubId: number;
  enableSelectStatus = true;
  // Format
  dayFormat = SystemConstant.TIME_FORMAT.DD_MM_YY;
  timeFormat = SystemConstant.TIME_FORMAT.HH_MM_SS;
  constructor(
    // private shareSvc: ShareService,
    private spinner: NgxSpinnerService,
    public translate: TranslateService,
    private router: Router,
    private authSvc: AuthenticationService
  ) { }

  async ngOnInit() {
    this.enableSelectStatus = true;

    // this.listClub = await getDataSelect(this.shareSvc.getListStores());
    // this.objListClub = keyBy(this.listClub, 'id');
    this._getDataByRole();
  }

  private _getDataByRole() {
    const userInfo = this.authSvc.getUserProfileLocal();
    console.log(userInfo);
    // if (userInfo.clubId) {
    //   this.clubId = userInfo.clubId;
    //   this.selectedClub = userInfo.clubId;
    //   this.isDisableSelected = !this.isDisableSelected;
    // }
    this.getListMember();
  }


  public viewDetail(accountId: string, event: any) {
    const url = UrlConstant.ROUTE.MAIN.CLUB_MEMBERS + `/${accountId}`;
    return event.ctrlKey ? window.open(url, '_blank') : this.router.navigate([url]);
  }

  public onSearch() {
    this.page = 1;
    this.getListMember();
  }

  public onChangeClub(selectedClub: number) {
    if (![undefined, this.clubId].includes(selectedClub)) {
      this.enableSelectStatus = true;
      if (selectedClub != null) {
        this.enableSelectStatus = false;
      }
      this.page = 1;
      return this.getListMember();
    }
  }

  public onChangeStatus() {
    this.page = 1;
    this.getListMember();
  }

  public onChangeChannel() {
    this.page = 1;
    this.getListMember();
  }

  public loadNext(page: number) {
    this.page = page;
    this.getListMember();
  }

  public getMemberStatus(status: any) {
    return SystemConstant.MEMBER_STATUS[status]
      || SystemConstant.MEMBER_STATUS.DEFAULT;
  }

  public onChangeLimit() {
    this.page = 1;
    this.getListMember();
  }

  public getListMember(options?: Query) {
    console.log('🐼 => ListClubMembersComponent => options:', options);
    this.spinner.show();
    options = {
      queryString: this.searchValue,
      isActive: this.selectedStatus,
      registrationChannel: this.selectedChannel,
      page: this.page,
      limit: this.pageSize,
    };
    // this.memberSvc.getListMemberAccount(omitBy(options, isNil)).subscribe((res: any) => {
    //   this.total = res.data.total;
    //   this.pages = getPage(this.total, this.pageSize);
    //   this.listClubMember = res.data.result.map((item: any) => {
    //     const status = item.isActive ? 'ACTIVE' : 'INACTIVE';
    //     const { clubId, createdBy, id, fullname, createdByFullName } = item;
    //     const [clubNameEn, clubNameVi] = this._getNameClub(clubId);
    //     return {
    //       ...item,
    //       memberStatus: this.getMemberStatus(status),
    //       clubNameEn,
    //       clubNameVi,
    //       createdBy: createdBy ? createdBy : id,
    //       createdByFullName: createdBy ? createdByFullName : fullname
    //     };
    //   });
    //   this.spinner.hide();
    // }, () => this.spinner.hide());
  }
}
