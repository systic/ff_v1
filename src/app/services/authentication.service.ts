import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

const mockUsers = [
  {
    username: 'admin',
    password: '1234',
    role: 'admin',
    name: 'Admin User'
  },
  {
    username: 'general',
    password: '1234',
    role: 'general',
    name: 'General User'
  }
];

@Injectable()
export class AuthenticationService {

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private router: Router) { }

  // mock login
  login({ username }): Observable<boolean> {
    let fakeResponse = false;
    mockUsers.every( user => {
      if (username === user.username) {
        fakeResponse = true;
        localStorage.setItem('currentUser', JSON.stringify(user));
        return false;
      }
      return true;
    });
    // returning a mock response with a mock delay
    return Observable.of(fakeResponse).delay(1000);
  }


  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }


  /**
   * @return {boolean} returns if any user is logged in or not
   */
  isLoggedIn(): boolean {
    if (localStorage.getItem('currentUser') === null) {
      return false;
    }
    return true;
  }


  /**
   * @param  {role: string} the role that needs to be checked
   * @return {boolean} returns true if the loggedin user has a particular role or is logged out
   */
  hasRole(role: string): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.role === role) {
      return true;
    }
    return false;
  }

  // mock loggedin user details, will return just name for now
  getUserDetails(): Observable<any> {
    return Observable.of({username : JSON.parse(localStorage.getItem('currentUser')).name});
  }
}
