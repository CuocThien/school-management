import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-tab-change-detail',
  templateUrl: './member-tab-change-detail.component.html',
  styleUrls: ['./member-tab-change-detail.component.scss']
})
export class MemberTabChangeDetailComponent implements OnInit {
  @Input() bodyUpdate: any;

  listKeyName = [];
  listKeyValue = [];

  constructor() { }

  ngOnInit(): void {
    this._handleData();
  }

  private _handleData() {
    for (const [key, value] of Object.entries(this.bodyUpdate)) {
      if (key !== 'fingerprint' && ![undefined, null].includes(value)) {
        this.listKeyName.push(key);
        (typeof value) === 'object' ? this.listKeyValue.push(JSON.stringify(value)) : this.listKeyValue.push(value);
      }
    }
  }

}
