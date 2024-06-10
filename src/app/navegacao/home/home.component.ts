import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../item.service'; // Ajuste o caminho conforme necessário
import { Cupom } from '../../item/item.component'; // Ajuste o caminho conforme necessário
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  //CUPONS = OBJETOS MOSTRADOS NA HOME ORIUNDOS DO SERVICO SHARED
  cupons: Cupom[] = [];
  searchTerm: string = '';

  constructor(
    private itemService: ItemService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.itemService.getItems().subscribe(
      (data: Cupom[]) => {
        this.sharedService.setItems(data);
        this.cupons = this.sharedService.getItems();
        // this.filteredItems = data;
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
  }
  
  updateItems(){
    // this.filteredItems = this.sharedService.getItems()

  }

  onSearch(): void {
    // this.filteredItems=this.sharedService.onSearch(this.searchTerm.toLowerCase())
    // console.log(this.filteredItems)
    // this.filteredItems = this.cupons.filter(cupom => 
    //   cupom.de_cupom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    //   cupom.nome_estabelecimento.toLowerCase().includes(this.searchTerm.toLowerCase())
    // );
  }

  navigateToDetail(id: string): void {
    this.router.navigate(['/coupon', id]);
  }
}
