import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { StoreDetailsComponent } from '../../../modals/store-details/store-details.component';
import { StoresService } from '../../../services/stores.service';

@Component({
  selector: 'app-store-summary',
  templateUrl: './store-summary.component.html',
  styleUrls: ['./store-summary.component.scss']
})
export class StoreSummaryComponent implements OnInit {

  @Input() summary: any;
  @Output() closeStoreBox: EventEmitter<any> = new EventEmitter();

  constructor(
    private storesService: StoresService,
    private modalService: NgbModal) { }

  ngOnInit() {
  }

  closeStoreSummary() {
    this.closeStoreBox.emit(null);
  }

  showStoreDetails() {
    this.storesService.getStoreDetails(this.summary.storeId)
      .subscribe( response => {
        const modalRef = this.modalService.open(StoreDetailsComponent, {windowClass: 'modal-store-details'});
        modalRef.componentInstance.storeDetails = response;
      });
  }

}
