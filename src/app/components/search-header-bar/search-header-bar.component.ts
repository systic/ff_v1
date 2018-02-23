import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-header-bar',
  templateUrl: './search-header-bar.component.html',
  styleUrls: ['./search-header-bar.component.scss']
})
export class SearchHeaderBarComponent implements OnInit {

  @Input() searchPlaceholder: string;
  @Input() searchText: string;
  @Output() searchTextChange: EventEmitter<string> = new EventEmitter();

  mobileSearchExpanded = false;

  constructor() { }

  ngOnInit() {
  }

  updateSearchText(value: string) {
    this.searchText = value;
    this.searchTextChange.emit(value);
  }

}
