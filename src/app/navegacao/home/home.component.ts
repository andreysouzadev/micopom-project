import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../item.service'; // Ajuste o caminho conforme necessário
import { Cupom } from '../../item/item.component'; // Ajuste o caminho conforme necessário
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  cupons: Cupom[] = [];
  filteredItems: any[] = [];
  searchTerm: string = '';

  constructor(
    private itemService: ItemService,
    private router: Router
  ) {}

  ngOnInit() {
    this.itemService.getItems().subscribe(
      (data: Cupom[]) => {
        this.cupons = data; 
        this.filteredItems = data;
        console.log("Received Items:", this.cupons); 

      },
      error => {
        console.error('Erro ao buscar itens:', error);
      }
    );
  }

  onSearch(): void {
    this.filteredItems = this.cupons.filter(cupom => 
      cupom.de_cupom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      cupom.nome_estabelecimento.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  navigateToDetail(id: string): void {
    this.router.navigate(['/coupon', id]);
  }
}
