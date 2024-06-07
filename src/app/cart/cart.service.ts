import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private itemCountSubject = new BehaviorSubject<number>(0);

  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    this.loadCart();
  }

  private loadCart() {
    const cart = localStorage.getItem('cart');
    this.cartItems = cart ? JSON.parse(cart) : [];
    this.cartItemsSubject.next(this.cartItems);
    this.updateItemCount();
  }

  getItemCount(): Observable<number> {
    return this.itemCountSubject.asObservable();
  }

  addToCart(item: CartItem) {
    const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
    this.saveCart();
    this.updateItemCount();
  }

  updateQuantity(item: CartItem, quantity: number) {
    const cartItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (cartItem) {
      cartItem.quantity = quantity;
      this.saveCart();
      this.updateItemCount();
    }
  }

  removeFromCart(item: CartItem) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
    this.saveCart();
    this.updateItemCount();
  }

  private saveCart() {
    this.updateItemCount();
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartItemsSubject.next(this.cartItems);
  }

  private updateItemCount(): void {
    this.itemCountSubject.next(this.cartItems.length);
  }
}
