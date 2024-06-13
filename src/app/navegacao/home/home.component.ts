import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../item.service'; // Ajuste o caminho conforme necessário
import { Cupom } from '../../item/item.component'; // Ajuste o caminho conforme necessário
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { categoryService } from 'src/app/services/category.service';


export interface Categorias {
  id_categoria: number;
  no_categoria: string;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  //CUPONS = OBJETOS MOSTRADOS NA HOME ORIUNDOS DO SERVICO SHARED
  cupons: Cupom[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'todos';
  selectedPrice: string = 'all';
  selectedDiscount: string = 'all';
  selectedDate: string = 'all';
  categorias: Categorias[] = [];

  constructor(
    private itemService: ItemService,
    private router: Router,
    private sharedService: SharedService,
    private categoryService: categoryService,
  ) {}

  ngOnInit() {
    this.itemService.getItems().subscribe(
      (data: Cupom[]) => {
        this.sharedService.setItems(data);
        this.cupons = this.sharedService.getItems();
      },
      error => {
        console.error('Erro ao buscar itens:', error);
      }
    );
    
    this.sharedService.filteredItems$.subscribe((items: Cupom[]) => {
      this.cupons = items;
    });

    // Inicializar com todos os itens
    this.cupons = this.sharedService.getItems();

    //Buscar categorias para filtragem

    this.categoryService.getCategories().subscribe(
      (data: Categorias[]) => {
        this.categorias = data;
      },
      error => {
        console.error('Erro ao buscar categorias:', error);
      }
    );
  }

  // applyFilters() {
  //   this.sharedService.filterByCategory(this.selectedCategory);
  //   // this.sharedService.filterByPrice(this.selectedPrice);
  // }

  onCategoryChange(categoryId: string) {
    this.selectedCategory = categoryId;
  }

  onPriceChange(priceFilter: string) {
    this.selectedPrice = priceFilter;
  }

  onDiscountChange(discountFilter: string) {
    this.selectedDiscount = discountFilter;
  }

  onDateChange(dateFilter: string) {
    this.selectedDate = dateFilter;
  }

  applyFilters() {
    this.sharedService.filterByCategory(this.selectedCategory);
    this.sharedService.filterByPrice(this.selectedPrice);
    this.sharedService.filterByDiscount(this.selectedDiscount);
    this.sharedService.filterByDate(this.selectedDate);
  }

  resetFilters() {
    this.selectedCategory = 'todos';
    this.selectedPrice = 'all';
    this.selectedDiscount = 'all';
    this.selectedDate = 'all';
    this.sharedService.resetFilters();
  }


  
  updateItems(){
    // this.filteredItems = this.sharedService.getItems()

  }

  onSearch(): void {
  }

  navigateToDetail(id: string): void {
    this.router.navigate(['/coupon', id]);
  }
}
