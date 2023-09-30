import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-tab-study-process',
  templateUrl: './student-tab-study-process.component.html',
  styleUrls: ['./student-tab-study-process.component.scss']
})
export class StudentTabStudyProcessComponent implements OnInit {
  @Input() accountId: string;

  constructor() { }

  ngOnInit(): void {
    console.log('🐼 => StudentTabClassificationComponent => accountId:', this.accountId);
  }

}
