import { Component, OnInit, Input } from '@angular/core';
import { CartItem, CartService, } from 'src/app/cart/cart.service';
import { Router } from '@angular/router';
import { categoryService } from 'src/app/services/category.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Cupom } from 'src/app/item/item.component';
import { ItemService } from 'src/app/item.service';
import { SharedService } from 'src/app/shared.service';


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
  notifications = [
    { message: "20% off na picanha do Bar Figueiras! Apresente o cupom. Válido até 30/06/2024."},
    { message: "20% off na picanha do Bar Figueiras! Apresente o cupom. Válido até 30/06/2024."}
  ]
  cartOpen: boolean = false;
  cartItems: CartItem[] = [];
  cartTotal: number = 0; // Total do carrinho
  categorias: Categorias[] = []
  user: any;
  itemCount: number = 0;
  cupons: Cupom[] = [];
  filteredItems: any[] = [];
  searchTerm: string = '';

  constructor(
    private CategoryService: categoryService,
    private cartService: CartService,
    private authService: AuthService,
    private itemService: ItemService,
    private sharedService: SharedService,
    private route: Router,
    // private homeComponent: HomeComponent
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      console.log("CHAMOU", user)
      this.user = user;
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
        this.categorias = data;
      },
      (error: any) => {
        console.error('Erro ao buscar categorias', error)
      }
    );

    this.itemService.getItems().subscribe(
      (data: Cupom[]) => {
        this.cupons = data; 
        this.filteredItems = data;

      },
      error => {
      }
    );
    

  }

    onSearch(): void {
      this.sharedService.filterItems(this.searchTerm)
  }

  

    toggleCart() {
      if(this.authService.isLoggedIn()){
        this.cartOpen = !this.cartOpen;
      } else {
        console.log("A")
          this.route.navigate(['/login'])
        }
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
      this.cartService.removeItem(item);
    }

    calculateCartTotal(){
      this.cartTotal = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    
}
