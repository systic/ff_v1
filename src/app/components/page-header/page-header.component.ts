import { Component, OnInit, ViewChild , Renderer2, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from '../../services/authentication.service';
import { PageTitleService } from '../../services/page-title.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @ViewChild('sideNav') sideNav: ElementRef;

  bodyListen: any;
  pageTitle: Observable<string>;
  userIsAdmin: boolean;
  userDetails: Observable<any>;
  sideNavVisible = false;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // close side nav if width of browser is > 1024px
    if (event.target.innerWidth > 1024) {
      this.closeSideNav();
    }
  }

  constructor(
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private pageTitleService: PageTitleService,
    private authService: AuthenticationService) { }

  ngOnInit() {
    // get page title from page title service
    this.pageTitle = this.pageTitleService.getPageTitle();

    // get user details
    this.userDetails = this.authService.getUserDetails();

    // set user admin status
    this.userIsAdmin = this.authService.hasRole('admin');
  }

  // register the onBody click event and open or close side nav depending on conditions
  registerSideNav() {
    this.bodyListen = this.renderer.listen('document', 'click', (event) => {
      if (this.sideNavVisible) {
        // if side nav is open and user clicks outside side nav then close side nav
        if (!this.sideNav.nativeElement.contains(event.target)) {
          this.closeSideNav();
        }
      } else {
        this.openSideNav();
      }
    });
  }

  openSideNav() {
    this.sideNavVisible = true;
    this.renderer.addClass(document.body, 'sideNavIsVisible');
  }

  closeSideNav() {
    this.sideNavVisible = false;
    this.renderer.removeClass(document.body, 'sideNavIsVisible');
    // stop listening to body clicks
    if (this.bodyListen) {
      this.bodyListen();
    }
  }

  logout() {
    this.authService.logout();
  }

}
