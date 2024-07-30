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
  cupons: Cupom[] = [];
  displayedCupons: Cupom[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'todos';
  selectedPrice: string = 'all';
  selectedDiscount: string = 'all';
  selectedDate: string = 'all';
  categorias: Categorias[] = [];

  // Variáveis de paginação
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number[] = [];

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
        this.updateDisplayedCupons();
      },
      error => {
        console.error('Erro ao buscar itens:', error);
      }
    );
    
    this.sharedService.filteredItems$.subscribe((items: Cupom[]) => {
      this.cupons = items;
      this.updateDisplayedCupons();
    });

    this.cupons = this.sharedService.getItems();
    this.updateDisplayedCupons();

    this.categoryService.getCategories().subscribe(
      (data: Categorias[]) => {
        this.categorias = data;
      },
      error => {
        console.error('Erro ao buscar categorias:', error);
      }
    );
  }

  applyFilters() {
    this.sharedService.filterByCategory(this.selectedCategory);
    this.sharedService.filterByPrice(this.selectedPrice);
    this.sharedService.filterByDiscount(this.selectedDiscount);
    this.sharedService.filterByDate(this.selectedDate);
    this.currentPage = 1;
    this.updateDisplayedCupons();
  }

  resetFilters() {
    this.selectedCategory = 'todos';
    this.selectedPrice = 'all';
    this.selectedDiscount = 'all';
    this.selectedDate = 'all';
    this.sharedService.resetFilters();
    this.currentPage = 1;
    this.updateDisplayedCupons();
  }

  updateDisplayedCupons() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedCupons = this.cupons.slice(startIndex, endIndex);
    this.totalPages = Array(Math.ceil(this.cupons.length / this.itemsPerPage)).fill(0).map((x, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updateDisplayedCupons();
  }

  navigateToDetail(id: string): void {
    this.router.navigate(['/coupon', id]);
  }
}
