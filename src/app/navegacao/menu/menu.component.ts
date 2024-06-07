import { Component, OnInit, Input } from '@angular/core';
import { CartItem, CartService } from 'src/app/cart/cart.service';
import { Router } from '@angular/router';
import { categoryService } from 'src/app/services/category.service';
import { AuthService } from 'src/app/auth/auth.service';


export interface Categorias {
  id_categoria: number;
  no_categoria: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  cartOpen: boolean = false;
  cartItems: CartItem[] = [];
  cartTotal: number = 0; // Total do carrinho
  categorias: Categorias[] = []
  user: any;
  itemCount: number = 0;

  constructor(
    private CategoryService: categoryService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    
    
    this.authService.getUser().subscribe(user => {
      this.user = user;
      console.log("USER:", user);
    })

    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateCartTotal();
    });

    this.cartService.getItemCount().subscribe(count => {
      this.itemCount = count;
    })
    
    this.CategoryService.getCategories().subscribe(
      (data: Categorias[]) => {
        console.log(data)
        this.categorias = data;
      },
      (error: any) => {
        console.error('Erro ao buscar categorias', error)
      }
    )

  }
    toggleCart() {
      this.cartOpen = !this.cartOpen;
    }

    closeCart() {
      this.cartOpen = false;
    }

    logout(){
      this.authService.logout();
    }

    updateQuantity(item: CartItem, quantity: number) {
      if (quantity > 0) {
        this.cartService.updateQuantity(item, quantity);
        this.calculateCartTotal();
      }
    }

    removeFromCart(item: CartItem) {
      this.cartService.removeFromCart(item);
    }

    calculateCartTotal(){
      this.cartTotal = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    

    


  // export class MenuComponent {
  //   constructor(
  //     private router: Router
  //   ) {}
  //   @Input() categorias!: Categorias;
  
  //   }
}
