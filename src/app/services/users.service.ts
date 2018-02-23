import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

const { api } = environment;

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }

  /**
   * fetches and returns all users
   * @return {Observable<any>} returns an obervable of users
   */
  getUsers(): Observable<any> {
    return this.http.get(api.users);
  }

}
