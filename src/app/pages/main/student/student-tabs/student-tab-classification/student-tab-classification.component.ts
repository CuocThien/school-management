import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-tab-classification',
  templateUrl: './student-tab-classification.component.html',
  styleUrls: ['./student-tab-classification.component.scss']
})
export class StudentTabClassificationComponent implements OnInit {
  @Input() accountId: string;

  constructor() { }

  ngOnInit(): void {
    console.log('🐼 => StudentTabClassificationComponent => accountId:', this.accountId);

  }

}
