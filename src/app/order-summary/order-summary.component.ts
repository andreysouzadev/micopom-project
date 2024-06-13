import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { CartItem } from '../cart/cart.service';
import { LoadingService } from '../services/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  itensQuantity: number = 0;
  discount: number = 0;
  couponCode: string = '';

  constructor(
    private cartService: CartService,
    private loadingService: LoadingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getItems();
    this.total = this.cartService.getTotal();
    this.itensQuantity = this.cartService.getItensQuantity();
    
  }

  applyCoupon() {
    // Lógica para aplicar o cupom de desconto
    if (this.couponCode === 'DESCONTO10') {
      this.discount = this.total * 0.1; // 10% de desconto
    } else {
      alert('Cupom inválido');
      this.discount = 0;
    }
  }

  updateQuantity(itemId: CartItem, event: Event) {
    const input = event.target as HTMLInputElement;
    const quantity = +input.value;
    this.cartService.updateQuantity(itemId, +quantity);
    this.loadCart();
  }

  removeItem(itemId: CartItem) {
    this.cartService.removeItem(itemId);
    this.loadCart();
  }

  finalizePurchase() {
    // Lógica para finalizar a compra
    // alert('Compra finalizada com sucesso!');
    // this.cartService.clearCart();
    // this.loadCart();
    this.router.navigate(['/payment'])
  }
}
