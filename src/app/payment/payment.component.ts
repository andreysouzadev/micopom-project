import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PagseguroService } from '../services/pagseguro.service';
import { CartItem, CartService } from '../cart/cart.service';
import { LoadingService } from '../services/loading.service';
import { Router } from '@angular/router';

declare var PagSeguro: any

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{
  cartItems: CartItem[] = []
  paymentForm: FormGroup;
  customerForm: FormGroup;
  sessionId = 'YOUR_SESSION_ID';
  productIsPhysical = false
  total: number = 0;
  discount: number = 0;
  couponCode: string = '';
  selectedPaymentMethod: string = '';

  constructor(
    private fb: FormBuilder,
    private pagseguroService: PagseguroService,
    private cartService: CartService,
    private loadingService: LoadingService,
    private router: Router
  ) {
    const currentYear = new Date().getFullYear();
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{4} ?[0-9]{4} ?[0-9]{4} ?[0-9]{4}$/)]],
      expirationMonth: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])$/)]],
      expirationYear: ['', [Validators.required, Validators.pattern(`^(${currentYear}|${currentYear + 1}|${currentYear + 2}|${currentYear + 3}|${currentYear + 4}|${currentYear + 5}|${currentYear + 6}|${currentYear + 7}|${currentYear + 8}|${currentYear + 9})$`)]],
      cardCVC: ['', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
      cardHolder: ['', [Validators.required]],
      cardHolderDocument: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)]]
    });

    this.customerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)]]
    });
  }

  ngOnInit(): void {
    this.loadCart();
  }
  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;
  }

  loadCart() {
    this.cartItems = this.cartService.getItems();
    this.total = this.cartService.getTotal();
  }


  processPayment(): void {
    if(this.paymentForm.valid && this.customerForm.valid){
      const customerData = this.customerForm.value;
      const paymentData = this.paymentForm.value;

      this.loadingService.show();

      //GERA TOKEN DO CARTAO
      const card = PagSeguro.encryptCard({
        //Publickey do sandbox, em prod precisa gerar uma
        publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr+ZqgD892U9/HXsa7XqBZUayPquAfh9xx4iwUbTSUAvTlmiXFQNTp0Bvt/5vK2FhMj39qSv1zi2OuBjvW38q1E374nzx6NNBL5JosV0+SDINTlCG0cmigHuBOyWzYmjgca+mtQu4WczCaApNaSuVqgb8u7Bd9GCOL4YJotvV5+81frlSwQXralhwRzGhj/A57CGPgGKiuPT+AOGmykIGEZsSD9RKkyoKIoc0OS8CPIzdBOtTQCIwrLn2FxI83Clcg55W8gkFSOS6rWNbG5qFZWMll6yl02HtunalHmUlRUL66YeGXdMDC2PuRcmZbGO5a/2tbVppW6mfSWG3NPRpgwIDAQAB',
        number: this.paymentForm.get('cardNumber')?.value,
        brand: this.paymentForm.get('cardBrand')?.value, // GERAR
        cvv: this.paymentForm.get('cvv')?.value,
        expMonth: Number(this.paymentForm.get('expirationMonth')?.value),
        expYear: Number(this.paymentForm.get('expirationYear')?.value),
        holder: this.paymentForm.get('cardHolder')
      });
      console.log(card)

      const combinedData = {
        ...customerData,
        // ...paymentData,
        inputPaymentMethod: this.selectedPaymentMethod,
        valueTotal: this.total,
        cartItems: this.cartItems,
        paymentData: card
      }

      //Simulando chamada de API
      // this.pagseguroService.createPayment(combinedData).subscribe(
      //   response => {
      //     console.log('Payment response: ', response)
      //   },
      //   error => {
      //     console.log('Error processing payment:', error);
      //   }
      // )
      setTimeout(() => {
        this.loadingService.hide();
        console.log('Dados combinados: ', combinedData);

        this.pagseguroService.createPayment(combinedData).subscribe(
          response => {
            //Aqui criar logica para verificar se o pagamento foi aprovado ou nao
            console.log('Payment response: ', response)
            const paymentSuccess = true;
            if (paymentSuccess) {
              // this.router.navigate(['/confirmation'], { queryParams: { status: 'success' } });
            } else {
              // this.router.navigate(['/confirmation'], { queryParams: { status: 'failure' } });
            }
          },
          error => {
            console.log('Error processing payment:', error);
          }
        )
      }, 2000);  
    } else {
      alert('Formulario invalido');
    }
  }
}
