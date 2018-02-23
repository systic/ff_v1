import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

const { api } = environment;

@Injectable()
export class DevicesService {

  constructor(private http: HttpClient) { }

  /**
   * fetches and returns all devices
   * @return {Observable<any>} returns an obervable of devices
   */
  getDevices(): Observable<any> {
    return this.http.get(api.devices);
  }

}
