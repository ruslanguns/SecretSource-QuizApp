import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './http-config.interceptor';
import { LoadingInterceptor } from './loading.interceptor';

const interceptors = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true,
  },
];

export default interceptors;
