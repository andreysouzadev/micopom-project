import { Component, OnInit, Input } from '@angular/core';
import { CartItem, CartService } from 'src/app/cart/cart.service';
import { Router } from '@angular/router';
import { categoryService } from 'src/app/category.service';

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

  constructor(
    private CategoryService: categoryService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateCartTotal();
    });

    
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
