import { Injectable, OnInit } from '@angular/core';
import { ItemService } from './item.service';
import { BehaviorSubject, filter } from 'rxjs';
import { Cupom } from './item/item.component';
import { Observable } from 'rxjs';
// import { HomeComponent } from './navegacao/home/home.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

//MANTEM OS ITEMS QUE SÃO MOSTRADOS NA HOME
  private items: Cupom[] = [];
  private filteredItemsSubject = new BehaviorSubject<Cupom[]>([]);
  filteredItems$ = this.filteredItemsSubject.asObservable();

  private categoryFilter: string = 'todos';
  private priceFilter: string = 'all';
  private discountFilter: string = 'all';
  private dateFilter: string = 'all';


  constructor(
    private itemService: ItemService,
    // private homeComponent : HomeComponent
  ) { this.setItems() }


  getItems(): Cupom[] {
    return this.items;
  }

  setItems(items: Cupom[] = []){
    this.items = items.length ? items : this.loadInitialItems();
    this.filteredItemsSubject.next(this.items);
  }

  filterItems(param: string) {
    const filtered = this.items.filter(item => 
      item.de_cupom.toLowerCase().includes(param.toLowerCase()) ||
      item.no_cupom.toLowerCase().includes(param.toLowerCase()) ||
      item.nome_estabelecimento.toLowerCase().includes(param.toLowerCase())
    ); // Ajuste someProperty para a propriedade relevante do seu Cupom
    console.log("Filtered items:", filtered);
    this.filteredItemsSubject.next(filtered);
  }


  private loadInitialItems(): Cupom[] {
    var resultado: Cupom[] = []
    this.itemService.getItems().subscribe(
      (data: Cupom[]) => {
        resultado = data
      },
      error => {
        console.error('Erro ao buscar itens:', error);
      }
    );
    return resultado
  }

  filterByCategory(categoryId: string) {
    this.categoryFilter = categoryId;
    this.applyFilters();
  }

  filterByPrice(priceFilter: string) {
    this.priceFilter = priceFilter;
    this.applyFilters();
  }

  filterByDiscount(discountFilter: string) {
    this.discountFilter = discountFilter;
    this.applyFilters();
  }

  filterByDate(dateFilter: string) {
    this.dateFilter = dateFilter;
    this.applyFilters();
  }

  resetFilters() {
    this.categoryFilter = 'todos';
    this.priceFilter = 'all';
    this.discountFilter = 'all';
    this.dateFilter = 'all';
    this.filteredItemsSubject.next(this.items);
  }

  private applyFilters() {
    let filtered = this.items;


    if (this.categoryFilter !== 'todos') {
      const categoryIdNumber = parseInt(this.categoryFilter, 10);
      filtered = filtered.filter(item => item.id_categoria === categoryIdNumber);
    }

    if (this.priceFilter === 'low') {
      filtered = filtered.sort((a, b) => (a.vl_original - a.vl_desconto) - (b.vl_original - b.vl_desconto));
    } else if (this.priceFilter === 'high') {
      filtered = filtered.sort((a, b) => (b.vl_original - b.vl_desconto) - (a.vl_original - a.vl_desconto));
    }

    if (this.discountFilter === 'low') {
      filtered = filtered.sort((a, b) => a.vl_desconto - b.vl_desconto);
    } else if (this.discountFilter === 'high') {
      filtered = filtered.sort((a, b) => b.vl_desconto - a.vl_desconto);
    }

    if (this.dateFilter === 'new') {
      filtered = filtered.sort((a, b) => new Date(b.dt_validade).getTime() - new Date(a.dt_validade).getTime());
    } else if (this.dateFilter === 'old') {
      filtered = filtered.sort((a, b) => new Date(a.dt_validade).getTime() - new Date(b.dt_validade).getTime());
    }

    console.log("Filtered by category and price:", filtered);
    this.filteredItemsSubject.next(filtered);
  }
}
