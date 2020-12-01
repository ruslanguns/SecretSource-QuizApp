import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StoreService } from '../services';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(
    private store: StoreService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const accessToken = this.store.value.accessToken;

    if (accessToken && (!request.url.includes('login') || !request.url.includes('register'))) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + accessToken),
      });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
    }

    return next.handle(request);
  }
}
