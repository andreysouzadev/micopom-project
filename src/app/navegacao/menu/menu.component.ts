import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})


export class MenuComponent implements OnInit {
  cartOpen: boolean = false;
  cartItems: CartItem[] = [];
  cartTotal: number = 0; // Total do carrinho


  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateCartTotal();
    });
  }

  toggleCart() {
    this.cartOpen = !this.cartOpen;
  }

  closeCart() {
    this.cartOpen = false;
  }

  updateQuantity(item: CartItem, quantity: number) {
    if (quantity > 0) {
      this.cartService.updateQuantity(item, quantity);
      this.calculateCartTotal(); // Atualizar o total do carrinho
    }
  }

  removeFromCart(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

  calculateCartTotal() {
    this.cartTotal = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }


}
