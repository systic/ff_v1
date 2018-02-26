import { Injectable } from '@angular/core';
import { Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './authentication.service';

/**
 * This guard is restrict access to certain parts of the app based in user role.
 * It is assumed that this guard could only be used if the user is logged in and a
 * authGuard is already in place.
 */

@Injectable()
export class RoleGuardService implements CanActivateChild {

  constructor(
    private authService: AuthenticationService,
    private router: Router) { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // if user role is admin then allow access
    if (this.authService.hasRole('admin')) {
      return true;
    }

    // else redirect to dashboard
    this.router.navigate(['/dashboard']);
    return false;
  }

}
