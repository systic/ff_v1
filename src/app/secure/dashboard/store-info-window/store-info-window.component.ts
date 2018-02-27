import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-store-info-window',
  templateUrl: './store-info-window.component.html',
  styleUrls: ['./store-info-window.component.scss']
})
export class StoreInfoWindowComponent implements OnInit {

  @Input() summary: any;
  @Input() storeType: string;

  constructor() { }

  ngOnInit() {
  }

}
