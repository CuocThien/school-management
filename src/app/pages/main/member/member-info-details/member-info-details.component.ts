import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { keyBy } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { TabMenu } from 'src/app/core/models/common/tab-menu.model';
import { UserProfile } from 'src/app/core/models/share/user-profile.model';
import { ShareService } from 'src/app/core/services/share/share.service';
import { onChangeNavTab, rotateImages } from 'src/app/core/utils';
import { TAB_MEMBER } from './tab-member';

@Component({
  selector: 'app-member-info-details',
  templateUrl: './member-info-details.component.html',
  styleUrls: ['./member-info-details.component.scss'],
})
export class MemberInfoDetailsComponent implements OnInit {
  userMemberInfo: UserProfile;
  userId: string;
  formatDate = SystemConstant.TIME_FORMAT.DD_MM_YY;
  avatarUser = '';
  avatarUserDefault = '../../../assets/images/admin/Avatar.png';
  userIdentityCard = '';
  userIdentityCardDefault = '../../../assets/images/no-image.jpg';
  currentMemberClubId = '';
  currentMemberStatus = '';
  avatarColor = 'no-contract';
  // Tab Active
  activeIdTab = 1;
  contractDebit = 0;
  ptContractDebit = 0;
  tabMember: TabMenu[];

  constructor(
    private routerActive: ActivatedRoute,
    private modalSvc: NgbModal,
    private spinner: NgxSpinnerService,
    private shareSvc: ShareService,
    public translate: TranslateService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.tabMember = TAB_MEMBER;
    this.userId = this.routerActive.snapshot.paramMap.get('id');
    this._getAllUserInfo();
    this._handlerRoutingTab();
  }

  private _handlerRoutingTab() {
    const tabCurrent = /[^/]*$/.exec(location.pathname)[0];
    const objTabMenu = keyBy(this.tabMember, 'template');
    const itemMenu = objTabMenu[tabCurrent] || this.tabMember[0];
    this.activeIdTab = itemMenu.id || 1;
  }

  private _getAvatarColorContract(userInfo: UserProfile) {
    const classCss = {
      DEFAULT: 'contract no-contract',
      CURRENT: 'contract current-contract',
      FROZEN: 'contract frozen-contract',
      FUTURE: 'contract future-contract',
      PAST: 'contract past-contract',
      PAYMENT: 'contract payment-contract',
    };
    return classCss[userInfo.memberContract?.status] || classCss['DEFAULT'];
  }

  private _getAllUserInfo() {
    this.spinner.show();
    this.shareSvc.getMemberInfoByAccountId(this.userId).subscribe((memberInfo: any) => {
      this.userMemberInfo = memberInfo.data;
      this.avatarColor = this._getAvatarColorContract(this.userMemberInfo);
      /**Get avatar image */
      this.avatarUser = this.avatarUserDefault;
      /**Get id card image */
      this.userIdentityCard = this.userIdentityCardDefault;
      /**Get member club id  */
      if (this.userMemberInfo.clubId) {
        this.currentMemberClubId = this.userMemberInfo.clubId.toString();
      }
      /** Get member status **/
      this.currentMemberStatus = memberInfo.data.memberContract?.status || '';

      this.spinner.hide();
    }, () => this.spinner.hide());
  }

  public onChangeNav(event) {
    onChangeNavTab(event, this.tabMember, this.userMemberInfo, this.location, 'MEMBER');
    console.log(this.userMemberInfo);
    /** nextId === 1 is tab information */
    if (event.nextId === 1) {
      this._getAllUserInfo();
    }
  }

  public openImage(image: any, type: string) {
    rotateImages(image, this.modalSvc, this.userIdentityCardDefault, type);
  }
}
