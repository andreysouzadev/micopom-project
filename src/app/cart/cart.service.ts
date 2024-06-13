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
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.loadCartFromLocalStorage());
  private itemCountSubject = new BehaviorSubject<number>(0);
  apiUrl = environment.apiUrl;

  cartItems$ = this.cartItemsSubject.asObservable();
  itemCount$ = this.itemCountSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
    this.updateItemCount();
    if (this.authService.isLoggedIn()) {
      this.loadUserCart();
    }

    this.authService.getUser().subscribe(user => {
      if (user) {
        this.syncCartWithServer();
      }
    });
  }

  loadCartFromLocalStorage(): CartItem[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  saveCartToLocalStorage(cartItems: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    this.updateItemCount();
  }

  loadCartFromServer() {
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
    if (this.authService.isLoggedIn()) {
      this.saveCartToServer(updatedCart);
    }
  }


  updateQuantity(item: CartItem, quantity: number): void {
    const currentCart = this.cartItemsSubject.value;
    const updatedCart = currentCart.map(cartItem =>
      cartItem.id === item.id ? { ...cartItem, quantity } : cartItem
    );
    this.cartItemsSubject.next(updatedCart);
    this.saveCartToLocalStorage(updatedCart);
    if (this.authService.isLoggedIn()) {
      this.saveCartToServer(updatedCart);
    }
  }

  removeItem(item: CartItem): void {
    const itemId = item.id
    const currentCart = this.cartItemsSubject.value;
    const updatedCart = currentCart.filter(item => item.id !== itemId);
    this.cartItemsSubject.next(updatedCart);
    this.saveCartToLocalStorage(updatedCart);
    if (this.authService.isLoggedIn()) {
      this.saveCartToServer(updatedCart);
    }
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    this.saveCartToLocalStorage([]);
    if (this.authService.isLoggedIn()) {
      this.saveCartToServer([]);
    }
  }

  loadUserCart(): void {
    if (this.authService.isLoggedIn()) {
      this.loadCartFromServer().subscribe(serverCartItems => {
        const localCartItems = this.loadCartFromLocalStorage();
        const combinedCartItems = this.mergeCarts(localCartItems, serverCartItems);
        this.cartItemsSubject.next(combinedCartItems);
        this.saveCartToLocalStorage(combinedCartItems);
        this.saveCartToServer(combinedCartItems);
      });
    }
  }

  mergeCarts(localCart: CartItem[], serverCart: CartItem[]): CartItem[] {
    const mergedCart = [...serverCart];
    localCart.forEach(localItem => {
      const existingItem = mergedCart.find(item => item.id === localItem.id);
      if (existingItem) {
        existingItem.quantity += localItem.quantity;
      } else {
        mergedCart.push(localItem);
      }
    });
    return mergedCart;
  }

  syncCartWithServer() {
    const localCartItems = this.loadCartFromLocalStorage();
    if (localCartItems.length > 0) {
      this.saveCartToServer(localCartItems);
    } else {
      this.loadUserCart();
    }
  }

  getItems(): CartItem[] {
    return this.cartItems;
  }

  getTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  getItensQuantity(): number {
    return this.cartItems.length;
  }

  private loadCart() {
    const cart = localStorage.getItem('cart');
    this.cartItems = cart ? JSON.parse(cart) : [];
    this.cartItemsSubject.next(this.cartItems);
  }

  getItemCount(): Observable<number> {
    return this.itemCount$
  }

  private updateItemCount(): void {
    const currentCart = this.cartItemsSubject.value;
    const itemCount = currentCart.reduce((total, item) => total + item.quantity, 0);
    this.itemCountSubject.next(itemCount);
  }

}
