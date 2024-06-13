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
  selectedPrice: string = 'todos';
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
        console.log("Received Items:", this.cupons);
      },
      error => {
        console.error('Erro ao buscar itens:', error);
      }
    );
    
    this.sharedService.filteredItems$.subscribe((items: Cupom[]) => {
      this.cupons = items;
      console.log("Updated cupons in Home component:", this.cupons);
    });

    // Inicializar com todos os itens
    this.cupons = this.sharedService.getItems();

    //Buscar categorias para filtragem

    this.categoryService.getCategories().subscribe(
      (data: Categorias[]) => {
        this.categorias = data;
        console.log("Received Categories:", this.categorias);
      },
      error => {
        console.error('Erro ao buscar categorias:', error);
      }
    );
  }

  applyFilters() {
    this.sharedService.filterByCategory(this.selectedCategory);
    // this.sharedService.filterByPrice(this.selectedPrice);
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
