import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './http-config.interceptor';

const interceptors = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptor,
    multi: true
 }
];

export default interceptors;