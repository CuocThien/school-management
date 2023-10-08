import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ScoreService, SemesterService, YearService } from 'src/app/core/services';
import { omitBy, isNil } from 'lodash';
import { Query } from 'src/app/core/models/share/query.model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-student-tab-study-process',
  templateUrl: './student-tab-study-process.component.html',
  styleUrls: ['./student-tab-study-process.component.scss']
})
export class StudentTabStudyProcessComponent implements OnInit {
  @Input() accountId: string;
  listSemester = [];
  listYear = [];
  listStudyProcess = [];
  avgScore?: number;

  selectedSemester?: number;
  selectedYear?: number;
  constructor(
    private spinner: NgxSpinnerService,
    public translate: TranslateService,
    private yearSvc: YearService,
    private semesterSvc: SemesterService,
    private scoreSvc: ScoreService,
    private routerActive: ActivatedRoute,

  ) { }

  ngOnInit() {
    this._getYears();
    this.accountId = this.routerActive.snapshot.paramMap.get('id');
  }

  private _getYears() {
    this.spinner.show();
    this.yearSvc.getYears({}).subscribe((res: any) => {
      this.listYear = res.data.result;
      res.data.result.map(item => {
        if (item.isActive) return this.selectedYear = item.id;
      });
      this._getSemesters();
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
      this.getStudyProcess();
      this.spinner.hide();
    }, () => this.spinner.hide());
  }

  public onChangeYear() {
    this.listStudyProcess = [];
    this.avgScore = null;
    this.getStudyProcess();
  }

  public onChangeSemester() {
    this.listStudyProcess = [];
    this.avgScore = null;
    this.getStudyProcess();
  }


  public getStudyProcess(options?: Query) {
    this.spinner.show();
    options = {
      yearId: this.selectedYear,
      semesterId: this.selectedSemester,
    };
    this.scoreSvc.getStudyProcess(this.accountId, omitBy(options, isNil)).subscribe((res: any) => {
      this.listStudyProcess = res.data.studyProcess;
      this.avgScore = res.data.scoreSemester;
      this.spinner.hide();
    }, () => this.spinner.hide());
  }
}
