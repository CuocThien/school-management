import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { Query } from 'src/app/core/models/share/query.model';
import { AuthenticationService } from 'src/app/core/services/common/auth.service';
import { MemberService } from 'src/app/core/services/member/member.service';
import { omitBy, isNil } from 'lodash';
import { getPage } from 'src/app/core/utils';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { Store } from 'src/app/core/models/share/store.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormConfirmRequestChangeTypeComponent } from '../form-member-type/form-confirm-request-change-type/form-confirm-request-change-type.component';

@Component({
  selector: 'app-list-member-type',
  templateUrl: './list-member-type.component.html',
  styleUrls: ['./list-member-type.component.scss']
})
export class ListMemberTypeComponent implements OnInit {
  listClub: Store[] = [];
  objListClub = {};
  listRequestMembers = [];
  listStatus = [
    {
      value: 'WAITFORCONFIRM',
      name: 'WAITFORCONFIRM'
    },
    {
      value: 'APPROVED',
      name: 'APPROVED'
    },
    {
      value: 'REJECTED',
      name: 'REJECTED'
    }
  ];

  // Format
  dayFormat = SystemConstant.TIME_FORMAT.DD_MM_YY;
  timeFormat = SystemConstant.TIME_FORMAT.HH_MM_SS;

  // Filter
  selectedChannel: string;
  selectedStatus: string;
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

  constructor(
    // private shareSvc: ShareService,
    private modalSvc: NgbModal,
    private memberSvc: MemberService,
    private spinner: NgxSpinnerService,
    public translate: TranslateService,
    private router: Router,
    private authSvc: AuthenticationService
  ) { }

  async ngOnInit() {
    this.enableSelectStatus = true;
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
    this.getListRequestChangeType();
  }

  public viewDetail(accountId: string, event: any) {
    const url = UrlConstant.ROUTE.MAIN.CLUB_MEMBERS + `/${accountId}`;
    return event.ctrlKey ? window.open(url, '_blank') : this.router.navigate([url]);
  }

  public viewRequestDetail(value: any) {
    const modalRef = this.modalSvc.open(FormConfirmRequestChangeTypeComponent, {
      centered: true,
      size: 'md',
      backdrop: true,
    });
    modalRef.componentInstance.requestId = value.id;
    modalRef.componentInstance.fileUploaded = value.fileUploaded;
    modalRef.componentInstance.closeModal.subscribe((res) => {
      return res ? this.getListRequestChangeType() : {};
    });
  }

  public onSearch() {
    this.page = 1;
    this.getListRequestChangeType();
  }

  public onChangeClub(selectedClub: number) {
    if (![undefined, this.clubId].includes(selectedClub)) {
      this.enableSelectStatus = true;
      if (selectedClub != null) {
        this.enableSelectStatus = false;
      }
      this.page = 1;
      return this.getListRequestChangeType();
    }
  }

  public onChangeStatus() {
    this.page = 1;
    this.getListRequestChangeType();
  }

  public onChangeChannel() {
    this.page = 1;
    this.getListRequestChangeType();
  }

  public loadNext(page: number) {
    this.page = page;
    this.getListRequestChangeType();
  }

  public getMemberTypeStatus(status: any) {
    return SystemConstant.CLASS_STATUS[status]
      || SystemConstant.CLASS_STATUS.DEFAULT;
  }

  public onChangeLimit() {
    this.page = 1;
    this.getListRequestChangeType();
  }

  public getListRequestChangeType(options?: Query) {
    this.spinner.show();
    options = {
      queryString: this.searchValue,
      status: this.selectedStatus,
      page: this.page,
      limit: this.pageSize,
    };
    this.memberSvc.getListRequestChangeMemberType(omitBy(options, isNil)).subscribe((res: any) => {
      this.total = res.data.total;
      this.pages = getPage(this.total, this.pageSize);
      this.listRequestMembers = res.data.result.map((item: any) => {
        // const status = this.selectedStatus ? { status: this.selectedStatus } : item;
        return {
          ...item,
          memberStatus: this.getMemberTypeStatus(item.status),
        };
      });
      this.spinner.hide();
    }, () => this.spinner.hide());
  }
}
