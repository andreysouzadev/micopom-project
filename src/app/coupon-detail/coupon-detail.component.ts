import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../item.service'; // Ajuste o caminho conforme necessário
import { Cupom } from '../item/item.component'; // Ajuste o caminho conforme necessário

@Component({
  selector: 'app-coupon-detail',
  templateUrl: './coupon-detail.component.html',
  styleUrls: ['./coupon-detail.component.css']
})
export class CouponDetailComponent implements OnInit {
  coupon: any;
  quantity: number=1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.itemService.getItemById(id).subscribe(data => {
        this.coupon = data;
      });
    } else {
      // Redireciona para a página inicial ou exibe uma mensagem de erro
      this.router.navigate(['/']);
    }
  }

  buyCoupon(): void {
    console.log('Compra realizada')
    }
}
