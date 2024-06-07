import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

export interface Cupom {
  id_cupom: number;
  de_cupom: string;
  no_cupom: string;
  de_cupom_completa: string;
  vl_original: number;
  vl_desconto: number;
  dt_validade: Date;
  id_categoria: number;
  qt_disponivel: number;
  id_estabelecimento: number;
  url_imagem: string;
  qt_clicks: number;
  nome_estabelecimento: string;
  tipo_estabelecimento: string;
  media_avaliacoes: number;
  qtd_avaliacoes: number;
}

@Component({
  selector: 'app-cupom',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class CupomComponent {
  constructor(
    private router: Router
  ) {}
  @Input() cupom!: Cupom; // Ajuste conforme o modelo Item

  navigateToDetail(id: number): void {
    this.router.navigate(['/coupon', id]);
  }
}
