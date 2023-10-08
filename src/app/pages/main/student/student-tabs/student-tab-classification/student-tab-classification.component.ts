import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ScoreService } from 'src/app/core/services';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-student-tab-classification',
  templateUrl: './student-tab-classification.component.html',
  styleUrls: ['./student-tab-classification.component.scss']
})
export class StudentTabClassificationComponent implements OnInit {
  @Input() accountId: string;
  listScore = [];

  constructor(
    private spinner: NgxSpinnerService,
    public translate: TranslateService,
    private scoreSvc: ScoreService,
    private routerActive: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.accountId = this.routerActive.snapshot.paramMap.get('id');
    this.getScoreFinal();
  }


  public getScoreFinal() {
    this.spinner.show();
    this.scoreSvc.getScoreFinal(this.accountId).subscribe((res: any) => {
      this.listScore = res.data.result;
      this.spinner.hide();
    }, () => this.spinner.hide());
  }
}
