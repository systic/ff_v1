import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-footer',
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.scss']
})
export class PageFooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // scrolls to top of the page
  scrollTop() {
    window.scrollTo(0, 0);
  }

}
