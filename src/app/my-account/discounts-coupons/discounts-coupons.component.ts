import { Component, OnInit } from '@angular/core';
import { CouponService } from 'src/app/services/coupons.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-discounts-coupons',
  templateUrl: './discounts-coupons.component.html',
  styleUrls: ['./discounts-coupons.component.css']
})
export class DiscountsCouponsComponent implements OnInit {
  discountsCoupons: any[] = [];
  existentsCoupons: any[] = [];
  pagedCoupons: any[] = [];
  errorMessage: string | null = null;
  itemsPerPage = 3;
  currentPage = 1;
  totalPages = 0;

  produtosCadastrados = [
    { id: 1, name: 'Pão', restaurant: 'Padaria do João' },
    { id: 2, name: 'Queijo', restaurant: 'Queijaria da Maria' },
    { id: 3, name: 'Presunto', restaurant: 'Mercado do Zé' },
    // outros produtos...
  ];
  filteredProducts: any[] = [];
  filterText: string = '';

  newCoupon = {
    co_cupom: '',
    de_cupom: '',
    qt_limite_ativacoes: 0,
    dt_inicio: '',
    dt_expiracao: '',
    vl_desconto: 0,
    tp_desconto: '',
    product_ids: []
  };

  constructor(
    private couponService: CouponService,
    private loadingService: LoadingService
  ){}

  
  ngOnInit(): void {
    this.couponService.getDiscountsCoupons().subscribe(
      result => {
        this.discountsCoupons = result
        // this.pagedCoupons = result
        console.log(this.discountsCoupons)
        this.updatePagedCoupons();
        
      }, error => {

      }
    )

  }

  newCouponClick(): void {
    this.loadingService.show();
    this.couponService.getExistentsCoupons().subscribe(
      result => {
        this.existentsCoupons = result;
        this.filteredProducts = this.existentsCoupons;
      }, error => {
        console.log(error)
      }
    )
    this.loadingService.hide();
  }

  filterProducts(): void {
    const filter = this.filterText.toLowerCase();
    if (filter.length > 0) {
      this.filteredProducts = this.existentsCoupons.filter((product) =>
        product.no_estabelecimento.toLowerCase().includes(filter) || product.no_cupom.toLowerCase().includes(filter)
      );
    } else {
      this.filteredProducts = this.existentsCoupons;
    }
  }

  async onSubmit() {
    // Lógica para salvar o novo cupom
    console.log('Novo cupom:', this.newCoupon);
    this.couponService.newDiscountCoupon(this.newCoupon).subscribe(
      result => {

      }, error => {
        console.log(error)
      }
    )
    // Aqui você pode chamar o serviço para salvar o cupom
    // e adicionar o novo cupom à lista de cupons
  }

  updatePagedCoupons(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedCoupons = this.discountsCoupons.slice(start, end);
  }

  novoCupom(): void {
    // Lógica para adicionar um novo cupom
    console.log('Adicionar novo cupom');
  }

  changePage(event: Event, page: number): void {
    event.preventDefault(); 
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedCoupons();

    }
  }

}
