import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { StudentService } from 'src/app/core/services';

@Component({
  selector: 'app-student-tab-detail',
  templateUrl: './student-tab-detail.component.html',
  styleUrls: ['./student-tab-detail.component.scss']
})
export class StudentTabDetailComponent implements OnInit {
  @Input() accountId: string;
  studentInfo: any;
  parentInfo: any;

  dayFormat = SystemConstant.TIME_FORMAT.DD_MM_YY;

  constructor(
    private spinner: NgxSpinnerService,
    private studentSvc: StudentService,
    public translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this._getAllUserInfo();
  }

  private _getAllUserInfo() {
    this.spinner.show();
    this.studentSvc.getStudent(this.accountId).subscribe((res: any) => {
      this.studentInfo = res.data.studentInfo;
      this.parentInfo = res.data.parentInfo;
      this.spinner.hide();
    }, () => this.spinner.hide());
  }

}
