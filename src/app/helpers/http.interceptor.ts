import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
import {tap} from 'rxjs/operators';

import { StorageService } from '../services/storage.service';
import { EventBusService } from '../shared/event-bus.service';
import { EventData } from '../shared/event.class';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private currentUser: any;

  constructor(private storageService: StorageService, 
    private eventBusService: EventBusService,
    private router: Router 
    ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      withCredentials: false,
    });

    this.currentUser = this.storageService.getUser();
    
    // return next.handle(req).pipe(
    //   catchError((error) => {
    //     if ( error instanceof HttpErrorResponse && !req.url.includes('user/login') && error.status === 401) {
    //       return this.handle401Error(req, next);
    //     }

    //     if (!this.currentUser.authenticated) {
    //       this.router.navigateByUrl('/');
    //     }

    //     return throwError(() => error);
    //   })
    // );

    return next.handle(req).pipe( tap(() => {},
      (event: any) => {
      if (event instanceof HttpErrorResponse) {
        if (event.status !== 401) {
         return;
        }
        this.router.navigate(['/']);
      }

      if (!this.currentUser.authenticated) {
        this.router.navigateByUrl('/');
      }

    }));


  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      if (this.storageService.isLoggedIn()) {
        this.eventBusService.emit(new EventData('logout', null));
      }
    }

    return next.handle(request);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];