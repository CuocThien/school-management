import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { Query } from 'src/app/core/models/share/query.model';
import { MemberTabChangeDetailComponent } from '../member-tab-change-detail/member-tab-change-detail.component';

@Component({
  selector: 'app-member-tab-changes',
  templateUrl: './member-tab-changes.component.html',
  styleUrls: ['./member-tab-changes.component.scss']
})
export class MemberTabChangesComponent implements OnInit {
  @Input() userId: string;
  listMemberChangesLog = [];
  // Pagination
  total: number;
  pages: number;
  page = SystemConstant.PAGING.PAGES;
  pageSize = SystemConstant.PAGING.PAGESIZE;
  dayFormat = SystemConstant.TIME_FORMAT.DD_MM_YY
  timeFormat = SystemConstant.TIME_FORMAT.HH_MM_SS

  constructor(
    private spinner: NgxSpinnerService,
    private modalSvc: NgbModal,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.getListMemberChangesLog();
  }

  public loadNext(page: number) {
    this.page = page;
    this.getListMemberChangesLog();
  }

  public getListMemberChangesLog(options?: Query) {
    this.spinner.show();
    options = {
      page: this.page,
      limit: this.pageSize
    };
    console.log('🐼 => MemberTabChangesComponent => options:', options);
    // this.memberSvc.getListMemberChangesLog(this.userId, omitBy(options, isNil)).pipe(finalize(() => this.spinner.hide())).subscribe((res: any) => {
    //   this.total = res.data.total;
    //   this.listMemberChangesLog = res.data.result;
    //   this.pages = getPage(this.total, this.pageSize);
    // });
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
