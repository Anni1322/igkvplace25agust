import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class httpInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      const SetHeaders = 'nfklud';  
    // const token = this.auth.getToken();
    //   if (token) {
    //     const clonedRequest = request.clone({
    //       setHeaders: {
    //         Setheader : `Bearer ${token}`
    //       }
    //     });
    //     console.log('Set Header', clonedRequest.headers.get('Setheader'));
    //     return next.handle(clonedRequest);
    //   }

    return next.handle(request.clone({setHeaders: {SetHeaders}}));
  }
}
