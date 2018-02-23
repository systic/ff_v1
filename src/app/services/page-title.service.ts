import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PageTitleService {

  pageTitle = new BehaviorSubject<string>('');

  getPageTitle() {
    return this.pageTitle.asObservable();
  }

  constructor() { }

}
