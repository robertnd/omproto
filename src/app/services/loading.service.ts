import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const LOADING_API_PREFIX = 'https://oldmutual.vergeinteractivelabs.com:19090/api/v1/data/';
//const LOADING_API_PREFIX = 'http://localhost:19090/api/v1/data/';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private http: HttpClient) { }

  getRecommendations(currentUser: any): Observable<any> {

    let rUrl = LOADING_API_PREFIX + 'recommendations'
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token.accessToken}` 
      })
    };
    return this.http.get(rUrl, httpOptions)
  }

  prefillOnID(currentUser: any, idType: string, idNumber: string): Observable<any> {

    let rUrl = LOADING_API_PREFIX + `customer/byid/${idType}/${idNumber}`
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentUser.token.accessToken}` 
      })
    };
    return this.http.get(rUrl, httpOptions)
  }

}
