import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const apiUrl = environment.apiUrl

    const authToken = this.authService.getToken();
    const isAuthUrl = 
        req.url.startsWith(apiUrl + 'cart/cart')
        req.url.startsWith(apiUrl + 'payments/process-payment-pix')
        // || req.url.startsWith(apiUrl + '/api/protected'); // Adicione mais URLs conforme necessário

    
    if (authToken && isAuthUrl) {
        const cloned = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${authToken}`)
        });
        return next.handle(cloned);
      } else {
        return next.handle(req);
      }

  }
}
