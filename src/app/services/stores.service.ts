import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

const { api } = environment;

@Injectable()
export class StoresService {

  constructor(private http: HttpClient) { }

  /**
   * @return {Observable<any>} return country wise all stores with map locations and status
   */
  getStores(): Observable<any> {
    return this.http.get(api.storeLocations);
  }

  /**
   * @param  {string} storeId : the id of store for which details are to be fetched
   * @return {Observable<any>} : store details
   */
  getStoreDetails(storeId: string): Observable<any> {
    return this.http.get(api.storeDetails);
  }

  /**
   * @param  {string} storeId : the id of store for which summary is to be fetched
   * @return {Observable<any>} : store summary
   */
  getStoreSummary(storeId: string): Observable<any> {
    return this.http.get(api.storeSummary);
  }


  /**
   * get the time series data of stores
   * @return {Observable<any>} [description]
   */
  getTimeSeriesData(): Observable<any> {
    return this.http.get(api.storesTimeSeriesData);
  }

}
