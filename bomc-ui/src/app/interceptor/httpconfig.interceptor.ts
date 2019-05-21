import { Injectable } from '@angular/core';
import { ErrorDialogService } from '../error-dialog/errordialog.service';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(public errorDialogService: ErrorDialogService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // _______________________________________________
    // Handle the request.
    const token: string = localStorage.getItem('token');

    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json;charset=UTF-8') });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json;charset=UTF-8') });

    console.log('HttpConfigInterceptor#intercept - headers:', request.headers.keys());

    return next.handle(request).pipe(
      // Set request retry for three iterations.
      // retry(3),
      // _____________________________________________
      // Handle the response.
      // ---------------------------------------------
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('HttpConfigInterceptor#intercept - event--->>>', event);
          // bomc: comment following line.
          // this.errorDialogService.openDialog(event);
        }

        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        // ___________________________________________
        // Handle the response error.
        // -------------------------------------------
        console.log('HttpConfigInterceptor#intercept - error--->>>', error);

        let data = {};
        data = {
          reason: error && error.message ? error.message : '',
          status: error.status
        };

        this.errorDialogService.openDialog(data);

        return throwError(error);
      }));
  }
}
