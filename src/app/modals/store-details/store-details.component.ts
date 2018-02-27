import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AlphanumericSortPipe } from '../../pipes/alphanumeric-sort.pipe';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss']
})
export class StoreDetailsComponent implements OnInit {

  @Input() storeDetails: any;

  pageSize = 13;
  currentPage = 1;

  sortBy: any;
  orderIn = 'descending';

  constructor(
    public activeModal: NgbActiveModal,
    private sortPipe: AlphanumericSortPipe) { }

  ngOnInit() {
  }

  sortList(sortBy: string) {
    if (sortBy === this.sortBy) {
      this.orderIn = (this.orderIn === 'ascending') ? 'descending' : 'ascending';
    } else {
      this.orderIn = 'descending';
      this.sortBy = sortBy;
    }
    this.storeDetails = this.sortPipe.transform(this.storeDetails, this.sortBy, this.orderIn);
  }

}
