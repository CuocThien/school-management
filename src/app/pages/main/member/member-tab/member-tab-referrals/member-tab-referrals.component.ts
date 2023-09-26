import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { Query } from 'src/app/core/models/share/query.model';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-tab-referral',
  templateUrl: './member-tab-referrals.component.html',
  styleUrls: ['./member-tab-referrals.component.scss']
})
export class MemberTabReferralsComponent implements OnInit {
  @Input() userId: string;
  listMemberReferrals: any;
  dayFormat = SystemConstant.TIME_FORMAT.DD_MM_YY;
  timeFormat = SystemConstant.TIME_FORMAT.HH_MM_SS;
  total: number;
  pages: number;
  page = SystemConstant.PAGING.PAGES;
  pageSize = SystemConstant.PAGING.PAGESIZE;
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.getListMemberReferrals();
  }

  public getActiveStatus(status: any) {
    return SystemConstant.MEMBER_STATUS[status]
      || SystemConstant.MEMBER_STATUS.DEFAULT;
  }

  private getListMemberReferrals(options: Query = {}) {
    this.spinner.show();
    options = {
      order: 'DESC',
      page: this.page,
      limit: this.pageSize
    };
    console.log('🐼 => MemberTabReferralsComponent => options:', options);
    // this.memberSvc.getListMemberReferrals(this.userId, omitBy(options, isNil))
    //   .subscribe((res: any) => {
    //     this.listMemberReferrals = res.data.result.map((item: any) => {
    //       const status = item.isActive ? 'ACTIVE' : 'INACTIVE';
    //       return {
    //         ...item,
    //         activeStatus: this.getActiveStatus(status),
    //       };
    //     });
    //     this.total = res.data.total;
    //     this.pages = getPage(this.total, this.pageSize);
    //     this.spinner.hide();
    //   }, () => this.spinner.hide());
  }

  public onChangePage(page: number) {
    if (page) {
      this.page = page;
      this.getListMemberReferrals();
    }
  }

  public loadNext(page: number) {
    this.page = page;
    this.getListMemberReferrals();
  }

  public onChangeLimit() {
    this.page = 1;
    this.getListMemberReferrals();
  }

  public viewDetail(accountId: string, event: any) {
    const url = UrlConstant.ROUTE.MAIN.CLUB_MEMBERS + `/${accountId}`;
    return event.ctrlKey ? window.open(url, '_blank') : this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }
}
