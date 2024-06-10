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


  // onSearch(searchTerm: string): any[] {
  //   // this.itemService.getItems().subscribe(
  //   //     (data: Cupom[]) => {
  //   //         this.items = data.filter(cupom => 
  //   //         cupom.de_cupom.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   //         cupom.nome_estabelecimento.toLowerCase().includes(searchTerm.toLowerCase())
  //   //     )
  //   //     },
  //   //     error => {
  //   //       console.error('Erro ao buscar itens:', error);
  //   //     }
  //   //   );
  //   //   console.log(this.items)
  //   // //   this.homeComponent.updateItems()

  //       return this.items
  //   }
}
