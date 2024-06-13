import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../item.service'; // Ajuste o caminho conforme necessário
import { Cupom } from '../item/item.component'; // Ajuste o caminho conforme necessário
import { CartItem, CartService} from '../cart/cart.service';
import { CouponService } from '../services/coupons.service';

export interface Rating {
  nu_avaliacao: number;
  de_avaliacao: string;
  dt_avaliacao: Date;
  no_nome_completo: string
}

@Component({
  selector: 'app-coupon-detail',
  templateUrl: './coupon-detail.component.html',
  styleUrls: ['./coupon-detail.component.css']
})
export class CouponDetailComponent implements OnInit {
  coupon: any;
  ratings: any;
  quantity: number=1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private cartService: CartService,
    private CouponService: CouponService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.itemService.getItemById(id).subscribe(data => {
        // this.coupon = data;
        // console.log(data);
        // this.coupon = data.map(cupom => ({
        //   ...cupom,
        //   imagens: [cupom.url_imagem, cupom.url_imagem2, cupom.url_imagem3, cupom.url_imagem4].filter(url => url !== null)
        // }));

        this.coupon = {data, imagens:[data.url_imagem, data.url_imagem2, data.url_imagem3, data.url_imagem4].filter(url => url != null)}
        console.log(this.coupon)

        this.CouponService.getRatings(data.id_estabelecimento).subscribe(
          ratingsData => {
            this.ratings = ratingsData;
            console.log(ratingsData)
          }
        )
      });
    } else {
      // Redireciona para a página inicial ou exibe uma mensagem de erro
      this.router.navigate(['/']);
    }


  }

  buyCoupon(): void {
    const newItem: CartItem = {
      id: this.coupon.data.id_cupom,
      name: this.coupon.data.no_cupom,
      price: this.coupon.data.vl_original - this.coupon.data.vl_desconto,
      quantity: this.quantity,
      img: this.coupon.imagens[0]
      // Adicione outras propriedades conforme necessário
    };
    this.cartService.addToCart(newItem);
    alert('Item adicionado ao carrinho!');
    }

}
