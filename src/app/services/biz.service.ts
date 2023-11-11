import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


//const BIZ_API = 'http://localhost:19090/api/v1/onboard/motorvehicle';
const BIZ_API = 'https://oldmutual.vergeinteractivelabs.com:19090/api/v1/onboard/motorvehicle/';


@Injectable({
  providedIn: 'root'
})
export class BizService {

  constructor(private http: HttpClient) { }

  mvRequest(request: any): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${request.currentUser.token.accessToken}` 
      })
    };

    return this.http.post(BIZ_API, request, httpOptions)
  }
}
