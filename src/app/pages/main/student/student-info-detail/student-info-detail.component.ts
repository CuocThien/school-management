import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { keyBy } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { TabMenu } from 'src/app/core/models/common/tab-menu.model';
import { onChangeNavTab, rotateImages } from 'src/app/core/utils';
import { TAB_STUDENT } from './tab-student';
import { StudentService } from 'src/app/core/services';


@Component({
  selector: 'app-student-info-detail',
  templateUrl: './student-info-detail.component.html',
  styleUrls: ['./student-info-detail.component.scss']
})
export class StudentInfoDetailComponent implements OnInit {
  studentInfo: any;
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
  tabStudent: TabMenu[];

  constructor(
    private routerActive: ActivatedRoute,
    private modalSvc: NgbModal,
    private spinner: NgxSpinnerService,
    private studentSvc: StudentService,
    public translate: TranslateService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.tabStudent = TAB_STUDENT;
    this.userId = this.routerActive.snapshot.paramMap.get('id');
    this._getAllUserInfo();
    this._handlerRoutingTab();
  }

  private _handlerRoutingTab() {
    const tabCurrent = /[^/]*$/.exec(location.pathname)[0];
    const objTabMenu = keyBy(this.tabStudent, 'template');
    const itemMenu = objTabMenu[tabCurrent] || this.tabStudent[0];
    this.activeIdTab = itemMenu.id || 1;
  }

  private _getAvtColor(status) {
    const classCss = {
      DEFAULT: 'contract no-contract',
      WORKING: 'contract current-contract',
      STUDYING: 'contract current-contract',
      GRADUATED: 'contract past-contract',
    };
    return classCss[status] || classCss['DEFAULT'];
  }

  private _getAllUserInfo() {
    this.spinner.show();
    this.studentSvc.getStudent(this.userId).subscribe((res: any) => {
      this.studentInfo = {
        ...res.data.studentInfo,
        parseStatus: SystemConstant.ACCOUNT_STATUS[res.data.studentInfo?.status]
      };
      this.avatarColor = this._getAvtColor(this.studentInfo?.status);
      this.avatarUser = this.avatarUserDefault;
      this.spinner.hide();
    }, () => this.spinner.hide());
  }

  public onChangeNav(event) {
    onChangeNavTab(event, this.tabStudent, this.studentInfo, this.location, 'STUDENT');
    /** nextId === 1 is tab information */
    if (event.nextId === 1) {
      this._getAllUserInfo();
    }
  }

  public openImage(image: any, type: string) {
    rotateImages(image, this.modalSvc, this.userIdentityCardDefault, type);
  }
}
