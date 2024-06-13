import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';
import { Observable } from 'rxjs';

declare var PagSeguroDirectPayment: any;

@Injectable({
  providedIn: 'root'
})
export class PagseguroService {
  private sessionId: string;

  constructor(private http: HttpClient) {
    // this.getSessionId().subscribe((data: any) => {
    //   this.sessionId = data.sessionId;
    //   PagSeguroDirectPayment.setSessionId(this.sessionId);
    // });
  }

//   setSessionId(sessionId: string): void {
//     PagSeguroDirectPayment.setSessionId(sessionId);
//   }

//   createCardToken(card: any): Promise<string>{
//     return new Promise((resolve, reject) => {
//         PagSeguroDirectPayment.createCardToken({
//             cardNumber: card.number,
//             brand: card.brand,
//             cvv: card.cvv,
//             expirationMonth: card.expirationMonth,
//             expirationYear: card.expirationYear,
//             success: function(response: any) {
//               resolve(response.card.token);
//             },
//             error: function(response: any) {
//               reject(response.errors);
//             }
//         })
//     })
//   }

  getSessionId() {
    return this.http.get(`${environment.apiUrl}payments/createOrder`);
  }

  createPayment(paymentData: any): Observable<any> {
    console.log("CHAMOU O SERVICOXXX")
    return this.http.post(`${environment.apiUrl}payments/process-payment`, {paymentData});
  }
}
