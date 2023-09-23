/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss']
})
export class SkeletonLoaderComponent {

  @Input() Cwidth;
  @Input() Cheight;
  @Input() Circle: boolean;
  @Input() Class: string;

  public getMyStyles() {
    const myStyles = {
      'width.px': this.Cwidth ? this.Cwidth : '',
      'height.px': this.Cheight ? this.Cheight : '',
      'border-radius': this.Circle ? '50%' : ''
    };
    return myStyles;
  }
}
