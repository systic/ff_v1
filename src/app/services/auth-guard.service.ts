import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isLoggedIn = this.authService.isLoggedIn();

    // if currentURL is login then route depending on whether user is logged-in or not
    if (state.url === '/login') {
      if (isLoggedIn) {
        this.router.navigate(['/dashboard']);
        return false;
      }
      return true;
    }

    // for any other URL if user is logged-in then continue
    if (isLoggedIn) {
      return true;
    }

    // if the user is not logged-in then navigate to login page and store the attempted URL
    this.authService.redirectUrl = state.url;
    this.router.navigate(['/login']);
    return false;
  }
}
