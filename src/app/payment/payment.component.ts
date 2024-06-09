import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';

declare let window: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, AfterViewInit {
  @ViewChild('checkoutBtn', { static: false }) checkoutBtn: ElementRef;
  private mp: any;
  private apiUrl = environment.apiUrl + 'payments';
  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void { 
    const cardForm = this.mp.cardForm({
      amount: "100.5",
      iframe: true,
      form: {
        id: "form-checkout",
        cardNumber: {
          id: "form-checkout__cardNumber",
          placeholder: "Número do cartão",
        },
        expirationDate: {
          id: "form-checkout__expirationDate",
          placeholder: "MM/YY",
        },
        securityCode: {
          id: "form-checkout__securityCode",
          placeholder: "Código de segurança",
        },
        cardholderName: {
          id: "form-checkout__cardholderName",
          placeholder: "Titular do cartão",
        },
        issuer: {
          id: "form-checkout__issuer",
          placeholder: "Banco emissor",
        },
        installments: {
          id: "form-checkout__installments",
          placeholder: "Parcelas",
        },       
        identificationType: {
          id: "form-checkout__identificationType",
          placeholder: "Tipo de documento",
        },
        identificationNumber: {
          id: "form-checkout__identificationNumber",
          placeholder: "Número do documento",
        },
        cardholderEmail: {
          id: "form-checkout__cardholderEmail",
          placeholder: "E-mail",
        },
      },
      callbacks: {
        onFormMounted: (error: any) => {
          if (error) return console.warn("Form Mounted handling error: ", error);
          console.log("Form mounted");
        },
        onSubmit: (event: any) => {
          event.preventDefault();
           const {
            paymentMethodId: payment_method_id,
            issuerId: issuer_id,
            cardholderEmail: email,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType,
          } = cardForm.getCardFormData();
           fetch("/process_payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token,
              issuer_id,
              payment_method_id,
              transaction_amount: Number(amount),
              installments: Number(installments),
              description: "Descrição do produto",
              payer: {
                email,
                identification: {
                  type: identificationType,
                  number: identificationNumber,
                },
              },
            }),
          });
        },
        onFetching: (resource: any) => {
          console.log("Fetching resource: ", resource);
           // Animate progress bar
          const progressBar = document.querySelector(".progress-bar");
          // progressBar.removeAttribute("value");
           return () => {
            // progressBar.setAttribute("value", "0");
          };
        }
      },
    });

  }

  ngAfterViewInit(): void {
    console.log(window.MercadoPago)
      if (typeof window.MercadoPago !== 'undefined') {
        this.mp = new window.MercadoPago('TEST-eb522a44-b6cc-4acc-b6b4-2f7b4d623ab8', {
          locale: 'pt-BR'
        });
      } else {
        console.error('MercadoPago SDK não está disponível');
      }
    };

  processPayment(): void {
    console.log('chamou')
//     const amount = "100.5"
//     const 
//     if (this.mp) {
//       const body = JSON.stringify({
//         token,
//         issuer_id,
//         payment_method_id,
//         transaction_amount: Number(amount),
//         installments: Number(installments),
//         description: "Descrição do produto",
//         payer: {
//           email,
//           identification: {
//             type: identificationType,
//             number: identificationNumber,
//           }
//         }
//       })
//       this.http.post(`${this.apiUrl}/create_preference`, body)
//       .subscribe((preference: any) => {
//         this.mp.checkout({
//           preference: {
//             id: preference.id
//           },
//           autoOpen: true // abre automaticamente o checkout
//         });
//       }, error => {
//         console.log(error);
//       });
//     } else {
//       console.error('MercadoPago SDK não está inicializado');
//     }
//   }

  }}
