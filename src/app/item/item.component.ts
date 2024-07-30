import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { InteractionService } from '../services/interaction.service';

export interface Cupom {
  categoryId: string;
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
export class CupomComponent implements AfterViewInit{

  @Input() cupom!: Cupom; // Ajuste conforme o modelo Item

  constructor(
    private router: Router,
    private el: ElementRef,
    private interactionService: InteractionService
  ) {}

  ngAfterViewInit(): void {
    this.interactionService.trackClicks(this.el.nativeElement, this.cupom.id_cupom);
  }

  navigateToDetail(id: number): void {
    this.router.navigate(['/coupon', id]);
  }
}
