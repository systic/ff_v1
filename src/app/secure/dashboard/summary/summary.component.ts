import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnChanges {

  @Input() activeStoresCount: number;
  @Input() issueStoresCount: number;
  totalStores: number;
  activePercentage: number;
  issuePercentage: number;

  isVisibleMd = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.totalStores = this.activeStoresCount + this.issueStoresCount;
    if (this.totalStores !== 0) {
      this.activePercentage = Math.round(this.activeStoresCount * 100 / this.totalStores);
      this.issuePercentage = 100 - this.activePercentage;
    } else {
      this.activePercentage = 0;
      this.issuePercentage = 0;
    }
  }

}
