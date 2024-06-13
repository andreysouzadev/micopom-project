import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environment';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  img: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private itemCountSubject = new BehaviorSubject<number>(0);
  apiUrl = environment.apiUrl;

  cartItems$ = this.cartItemsSubject.asObservable();
  itemCount$ = this.itemCountSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
    this.updateItemCount();
    if (this.authService.isLoggedIn()) {
      this.loadUserCart();
    }

    // Subscribe to the logout event to clear the cart
    this.authService.getLogoutSubject().subscribe(() => {
      this.clearLocalStorage();
    });

    this.authService.getUser().subscribe(user => {
      if (user) {
        this.loadUserCart();
      }
    });
  }

  loadCartFromServer(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}cart/cart`);
  }

  saveCartToServer(cartItems: CartItem[]): void {
    this.http.post(`${this.apiUrl}cart/cart`, { cartItems }).subscribe(() => {
      this.updateItemCount();
    });
  }

  addItemToCart(item: CartItem): void {
    const currentCart = this.cartItemsSubject.value;
    const updatedCart = [...currentCart, item];
    this.cartItemsSubject.next(updatedCart);
    this.saveCartToLocalStorage(updatedCart);
    this.saveCartToServer(updatedCart);
  }

  updateQuantity(item: CartItem, quantity: number): void {
    const currentCart = this.cartItemsSubject.value;
    const updatedCart = currentCart.map(cartItem =>
      cartItem.id === item.id ? { ...cartItem, quantity } : cartItem
    );
    this.cartItemsSubject.next(updatedCart);
    this.saveCartToLocalStorage(updatedCart);
    this.saveCartToServer(updatedCart);
  }

  removeItem(item: CartItem): void {
    const itemId = item.id;
    const currentCart = this.cartItemsSubject.value;
    const updatedCart = currentCart.filter(item => item.id !== itemId);
    this.cartItemsSubject.next(updatedCart);
    this.saveCartToLocalStorage(updatedCart);
    this.saveCartToServer(updatedCart);
  }

  getItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  getTotal(): number {
    const currentCart = this.cartItemsSubject.value;
    return currentCart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  }

  getItensQuantity(): number {
    const currentCart = this.cartItemsSubject.value;
    return currentCart.length;
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    this.saveCartToLocalStorage([]);
    this.saveCartToServer([]);
  }

  loadUserCart(): void {
    if (this.authService.isLoggedIn()) {
      this.loadCartFromServer().subscribe(serverCartItems => {
        this.cartItemsSubject.next(serverCartItems);
        this.saveCartToLocalStorage(serverCartItems);
        this.updateItemCount();  // Adicione esta linha para garantir que o contador de itens seja atualizado
      });
    }
  }

  syncCartWithServer() {
    if (this.authService.isLoggedIn()) {
      this.loadUserCart();
    }
  }

  getItemCount(): Observable<number> {
    return this.itemCount$;
  }

  private saveCartToLocalStorage(cartItems: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    this.updateItemCount();
  }

  private clearLocalStorage(): void {
    localStorage.removeItem('cart');
    this.cartItemsSubject.next([]);
    this.updateItemCount();
  }

  private updateItemCount(): void {
    const currentCart = this.cartItemsSubject.value;
    const itemCount = currentCart.reduce((total, item) => total + item.quantity, 0);
    this.itemCountSubject.next(itemCount);
  }
}
