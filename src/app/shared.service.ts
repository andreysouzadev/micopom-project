import { Injectable, OnInit } from '@angular/core';
import { ItemService } from './item.service';
import { BehaviorSubject } from 'rxjs';
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


  constructor(
    private itemService: ItemService,
    // private homeComponent : HomeComponent
  ) { this.setItems() }


  getItems(): Cupom[] {
    console.log("Returning items from sharedService:", this.items);
    return this.items;
  }

  setItems(items: Cupom[] = []){
    this.items = items.length ? items : this.loadInitialItems();
    console.log("Items set in sharedService:", this.items);
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
    if (categoryId === 'todos') {
      this.filteredItemsSubject.next(this.items);
    } else {
      const categoryIdNumber = parseInt(categoryId, 10);
      const filtered = this.items.filter(item => item.id_categoria === categoryIdNumber);
      console.log("Filtered by category:", filtered);
      this.filteredItemsSubject.next(filtered);
    }
  }


  filterByPrice(priceFilter: string) {
    let filtered = this.items;
    if (priceFilter === 'low') {
      filtered = filtered.sort((a, b) => a.vl_original - b.vl_original);
    } else if (priceFilter === 'high') {
      filtered = filtered.sort((a, b) => b.vl_original - a.vl_original);
    }
    console.log("Filtered by price:", filtered);
    this.filteredItemsSubject.next(filtered);
  }
}
