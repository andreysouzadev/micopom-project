import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector:Injector) {}

  private get authService(): AuthService{
    return this.injector.get(AuthService)
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const apiUrl = environment.apiUrl
    const authToken = this.authService.getToken();

    const isAuthUrl = 
        req.url.startsWith(apiUrl + 'cart/cart') ||
        req.url.startsWith(apiUrl + 'payments/process-payment-pix') ||
        req.url.startsWith(apiUrl + 'payments/process-payment-card') 
        || req.url.startsWith(apiUrl + 'cupons/activate_coupon')
        || req.url.startsWith(apiUrl + 'accounts/log')
        || req.url.startsWith(apiUrl + 'discounts/discountsCoupons') 
        || req.url.startsWith(apiUrl + 'discounts/createCoupon') 
        || req.url.startsWith(apiUrl + 'discounts/existentsCoupons')
        // || req.url.startsWith(apiUrl + '/api/protected'); // Adicione mais URLs conforme necessário


    
    if (authToken && isAuthUrl) {
        const cloned = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${authToken}`)
        });
        return next.handle(cloned).pipe(
          tap(event => {
            if(event instanceof HttpResponse) {
              const newToken = event.headers.get('Authorization')?.split(' ')[1];
              if(newToken){
                this.authService.setToken(newToken)
              }
            }
          })
        );
      } else {
        return next.handle(req);
      }

  }
}
