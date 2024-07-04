import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';
import { Observable } from 'rxjs';

declare var PagSeguroDirectPayment: any;

@Injectable({
  providedIn: 'root'
})
export class PagseguroService {
  constructor(private http: HttpClient) {}

  getSessionId() {
    return this.http.get(`${environment.apiUrl}payments/createOrder`);
  }

  createPayment(paymentData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}payments/process-payment-card`, {paymentData});
  }
  createPaymentPix(paymentData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}payments/process-payment-pix`, {paymentData});
  }
}
