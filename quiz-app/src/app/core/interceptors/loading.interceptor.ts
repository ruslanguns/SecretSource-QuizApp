import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoadingService  } from '../services';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    private _loading: LoadingService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._loading.setLoading(true, request.url);
    return next.handle(request)
      .pipe(
        catchError(error => {
          this._loading.setLoading(false, request.url);
          return throwError(error);
        }),        
      )
      .pipe(
        map(evt => {
          if (evt instanceof HttpResponse) {
            this._loading.setLoading(false, request.url);
          }
          return evt
        })
      )
  }

}
