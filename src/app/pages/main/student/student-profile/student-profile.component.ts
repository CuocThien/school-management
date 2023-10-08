import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { Query } from 'src/app/core/models/share/query.model';
import { AuthenticationService } from 'src/app/core/services/common/auth.service';
import { ClassService, GradeService, SemesterService, StudentService, YearService } from 'src/app/core/services';
import { omitBy, isNil } from 'lodash';
import { getPage } from 'src/app/core/utils';
@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {
  // NEW
  listStudent = [];
  listYear = [];
  listSemester = [];
  listGrade = [];
  listClass = [];
  listGender = [
    {
      value: 1,
      name: 'Nam'
    },
    {
      value: 0,
      name: 'Nữ'
    }
  ]

  isAdmin = false;
  isOpenClass = false;
  // Filter
  selectedYear?: number;
  selectedSemester?: number;
  selectedGrade?: number;
  selectedClass?: number;
  selectedGender?: number;
  // Pagination
  total: number;
  pages: number;
  page = SystemConstant.PAGING.PAGES;
  pageSize = SystemConstant.PAGING.PAGESIZE;
  // Query
  searchValue = '';
  // Format
  dayFormat = SystemConstant.TIME_FORMAT.DD_MM_YY;
  timeFormat = SystemConstant.TIME_FORMAT.HH_MM_SS;
  constructor(
    // private shareSvc: ShareService,
    private spinner: NgxSpinnerService,
    public translate: TranslateService,
    private router: Router,
    private authSvc: AuthenticationService,
    private yearSvc: YearService,
    private semesterSvc: SemesterService,
    private gradeSvc: GradeService,
    private classSvc: ClassService,
    private studentSvc: StudentService,
  ) { }

  async ngOnInit() {
    this._getAllData();
  }

  private _getAllData() {
    const accType = this.authSvc.getAccountType();
    this._getYears();
    this._getSemesters();
    if (accType == 'ADMIN') {
      this.isAdmin = true;
      this._getGrades();
      this._getClasses();
    }
  }

  private _getYears() {
    this.spinner.show();
    this.yearSvc.getYears({}).subscribe((res: any) => {
      this.listYear = res.data.result;
      res.data.result.map(item => {
        if (item.isActive) return this.selectedYear = item.id;
      });
      this.spinner.hide();
    }, () => this.spinner.hide());
  }

  private _getSemesters() {
    this.spinner.show();
    this.semesterSvc.getSemesters({}).subscribe((res: any) => {
      this.listSemester = res.data.result;
      res.data.result.map(item => {
        if (item.isActive) return this.selectedSemester = item.id;
      });
      this.getListStudent();
      this.spinner.hide();
    }, () => this.spinner.hide());
  }

  private _getGrades() {
    this.spinner.show();
    this.gradeSvc.getGrades({}).subscribe((res: any) => {
      this.listGrade = res.data.result;
      this.spinner.hide();
    }, () => this.spinner.hide());
  }

  private _getClasses(options?: Query) {
    this.spinner.show();
    options = {
      gradeId: this.selectedGrade
    };
    this.classSvc.getClasses(omitBy(options, isNil)).subscribe((res: any) => {
      this.listClass = res.data.result;
      this.spinner.hide();
    }, () => this.spinner.hide());
  }


  public viewDetail(accountId: string, event: any) {
    const url = UrlConstant.ROUTE.MAIN.STUDENT + `/${accountId}`;
    return event.ctrlKey ? window.open(url, '_blank') : this.router.navigate([url]);
  }

  public onSearch() {
    this.page = 1;
    this.getListStudent();
  }

  public loadNext(page: number) {
    this.page = page;
    this.getListStudent();
  }

  public onChangeLimit() {
    this.page = 1;
    this.getListStudent();
  }

  public onChangeYear() {
    this.selectedClass = null;
    this.getListStudent();
  }

  public onChangeSemester() {
    this.selectedClass = null;
    this.getListStudent();
  }

  public onChangeGrade() {
    this.selectedClass = null;
    this._getClasses();
  }

  public onChangeClass() {
    this.getListStudent();
  }

  public onChangeGender() {
    this.getListStudent();
  }

  public getListStudent(options?: Query) {
    if (this.isAdmin && !this.selectedClass) return;
    this.spinner.show();
    options = {
      queryString: this.searchValue,
      yearId: this.selectedYear,
      semesterId: this.selectedSemester,
      classId: this.selectedClass,
      gender: this.selectedGender,
      page: this.page,
      limit: this.pageSize,
    };
    this.studentSvc.getStudents(omitBy(options, isNil)).subscribe((res: any) => {
      this.total = res.data.total;
      this.pages = getPage(this.total, this.pageSize);
      this.listStudent = res.data.result.map(item => {
        return {
          ...item,
          status: SystemConstant.ACCOUNT_STATUS[item.status]
        };
      });
      this.spinner.hide();
    }, () => this.spinner.hide());
  }
}

