import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SystemConstant } from 'src/app/core/constants/system.constant';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { Query } from 'src/app/core/models/share/query.model';
import { ClassService, GradeService, ScoreService, SemesterService, SubjectService, YearService } from 'src/app/core/services';
import { omitBy, isNil, mean, size } from 'lodash';
import { getPage } from 'src/app/core/utils';
import { FormBuilder, FormGroup, } from '@angular/forms';
@Component({
  selector: 'app-subject-assessment-page',
  templateUrl: './subject-assessment-page.component.html',
  styleUrls: ['./subject-assessment-page.component.scss']
})
export class SubjectAssessmentPageComponent implements OnInit {
  form: FormGroup;
  currentEditIndex?: number;

  isOpenSubject = false;
  isOpenClass = false;

  // NEW
  listScore = [];
  listSubject = [];
  listClass = [];
  listSemester = [];
  listYear = [];
  listGrade = [];

  // Filter
  selectedSubject?: number;
  selectedClass?: number;
  selectedGrade?: number;
  selectedSemester?: number;
  selectedYear?: number;
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
    private yearSvc: YearService,
    private semesterSvc: SemesterService,
    private subjectSvc: SubjectService,
    private classSvc: ClassService,
    private gradeSvc: GradeService,
    private fb: FormBuilder,
    private scoreSvc: ScoreService,
  ) { }

  ngOnInit() {
    this._createForm();
    this._getAllData();
  }

  ngAfterViewInit() {
    this._getGradesByType();
  }

  private _createForm() {
    this.form = this.fb.group({
      miniTest1Score: [null],
      miniTest2Score: [null],
      miniTest3Score: [null],
      midtermTestScore: [null],
      endtermTestScore: [null],
      review: [null],
    });
  }

  private _patchForm(data) {
    this.form.patchValue({
      miniTest1Score: data?.miniTest1Score,
      miniTest2Score: data?.miniTest2Score,
      miniTest3Score: data?.miniTest3Score,
      midtermTestScore: data?.midtermTestScore,
      endtermTestScore: data?.endtermTestScore,
      review: data?.review,
    });
  }

  private _getAllData() {
    this._getYears();
    this._getSemesters();
    // this._getGradesByType();
    // this._getSubjects();
    // this._getClassesByType();
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
      this._getGradesByType();
      this.spinner.hide();
    }, () => this.spinner.hide());
  }

  private _getGradesByType(options?: Query) {
    this.spinner.show();
    this.listScore = [];
    options = {
      semesterId: this.selectedSemester,
      yearId: this.selectedYear,
    };
    this.gradeSvc.getGradesByType(omitBy(options, isNil)).subscribe((res: any) => {
      this.listGrade = res.data.result;
      this.spinner.hide();
    }, () => this.spinner.hide());
  }

  private _getSubjects(options?: Query) {
    this.spinner.show();
    options = {
      semesterId: this.selectedSemester,
      yearId: this.selectedYear,
      gradeId: this.selectedGrade,
    };
    this.subjectSvc.getSubjects(omitBy(options, isNil)).subscribe((res: any) => {
      this.listSubject = res.data.result;
      this.spinner.hide();
    }, () => this.spinner.hide());
  }

  private _getClassesByType(options?: Query) {
    this.spinner.show();
    options = {
      yearId: this.selectedYear,
      semesterId: this.selectedSemester,
      gradeId: this.selectedGrade,
      subjectId: this.selectedSubject
    };
    this.classSvc.getClassesByType(omitBy(options, isNil)).subscribe((res: any) => {
      this.listClass = res.data.result;
      this.spinner.hide();
    }, () => this.spinner.hide());
  }

  private _updateScore(scoreId: string, body: any) {
    this.spinner.show();
    this.scoreSvc.updateScore(scoreId, body).subscribe(
      () => {
        this.getListScores();
        this.spinner.hide();
      }, () => this.spinner.hide());
  }


  public viewDetail(accountId: string, event: any) {
    const url = UrlConstant.ROUTE.MAIN.STUDENT + `/${accountId}`;
    return event.ctrlKey ? window.open(url, '_blank') : this.router.navigate([url]);
  }

  public enableEdit(index: number) {
    if (!isNil(this.currentEditIndex)) {
      this.listScore[this.currentEditIndex].isEnableEdit = false;
    }
    this.currentEditIndex = index;
    this.listScore[index].isEnableEdit = true;
    this._patchForm(this.listScore[index]);
  }

  public submitEditInline(scoreId: string) {
    const body = this.form.value;
    const score = {
      miniTest1Score: body.miniTest1Score,
      miniTest2Score: body.miniTest2Score,
      miniTest3Score: body.miniTest3Score,
      midtermTestScore: body.midtermTestScore,
      endtermTestScore: body.endtermTestScore,
    };
    const isEnableCalAvgScore = size(Object.keys(omitBy(score, isNil))) === 5;
    if (isEnableCalAvgScore) {
      const averageScore = this._calAverageScore(body);
      Object.assign(body, { averageScore });
    } else {
      Object.assign(body, { averageScore: null });
    }
    this._updateScore(scoreId, body);
  }

  private _calAverageScore(value: any) {
    const {
      miniTest1Score,
      miniTest2Score,
      miniTest3Score,
      midtermTestScore,
      endtermTestScore,
    } = value;
    const arrScore = [
      miniTest1Score,
      miniTest2Score,
      miniTest3Score,
      midtermTestScore,
      midtermTestScore,
      endtermTestScore,
      endtermTestScore,
      endtermTestScore,
    ].map(item => Number(item));
    return mean(arrScore);
  }

  public cancel(index: number) {
    this.listScore[index].isEnableEdit = false;
  }
  public onSearch() {
    this.page = 1;
    this.getListScores();
  }

  public loadNext(page: number) {
    this.page = page;
    this.getListScores();
  }

  public onChangeLimit() {
    this.page = 1;
    this.getListScores();
  }

  public onChangeYear() {
    this.selectedClass = null;
    this.selectedGrade = null;
    this.selectedSubject = null;
    if (!isNil(this.selectedYear)) {
      this._getGradesByType();
    }
  }

  public onChangeSemester() {
    this.selectedClass = null;
    this.selectedGrade = null;
    this.selectedSubject = null;
    this.isOpenSubject = false;
    this.isOpenClass = false;
    if (!isNil(this.selectedSemester)) {
      this._getGradesByType();
    }
  }

  public onChangeGrade() {
    this.selectedClass = null;
    this.selectedSubject = null;
    this.listClass = [];
    this.listSubject = [];
    this.listScore = [];
    if (!isNil(this.selectedGrade)) {
      this.isOpenSubject = true;
      this._getSubjects();
    } else {
      this.isOpenSubject = false;
      this.isOpenClass = false;
    }
  }

  public onChangeClass() {
    if (!isNil(this.selectedClass)) {
      this.getListScores();
    }
  }

  public onChangeSubject() {
    this.selectedClass = null;
    this.listClass = [];
    if (!isNil(this.selectedSubject)) {
      this._getClassesByType();
      this.isOpenClass = true;
    } else {
      this.isOpenClass = false;
    }
  }

  public getListScores(options?: Query) {
    if (!this.selectedClass || !this.selectedSubject) {
      this.listScore = [];
      return;
    }
    this.spinner.show();
    options = {
      // queryString: this.searchValue,
      yearId: this.selectedYear,
      semesterId: this.selectedSemester,
      page: this.page,
      limit: this.pageSize,
    };
    this.scoreSvc.getScoresByClass(this.selectedClass, this.selectedSubject, omitBy(options, isNil)).subscribe((res: any) => {
      this.total = res.data.total;
      this.pages = getPage(this.total, this.pageSize);
      this.listScore = res.data.result.map(item => {
        const data = {
          ...item,
          isEnableEdit: false,
        };
        return data;
      });
      this.spinner.hide();
    }, () => this.spinner.hide());
  }
}

