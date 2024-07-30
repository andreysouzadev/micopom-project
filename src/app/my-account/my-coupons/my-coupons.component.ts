import { Component, OnInit } from '@angular/core';
import { CouponService } from 'src/app/services/coupons.service';

@Component({
  selector: 'app-my-coupons',
  templateUrl: './my-coupons.component.html',
  styleUrls: ['./my-coupons.component.css']
})
export class MyCouponsComponent implements OnInit {
  coupons: any[] = [];
  errorMessage: string | null = null;

  constructor(private couponService: CouponService) {}

  ngOnInit(): void {
    this.couponService.getUserCoupons().subscribe({
      next: (data) => {
        this.coupons = data;
      },
      error: (error) => {
        console.error('Error fetching coupons:', error);
      }
    });
  }

  updateCouponStatuses(): void {
    const currentDate = new Date();
    this.coupons.forEach(coupon => {
      const expiryDate = new Date(coupon.expiryDate);
      if (coupon.status !== 'Utilizado' && coupon.status !== 'Aguardando Pagamento' && expiryDate < currentDate) {
        coupon.status = 'Vencido';
      }
    });
  }
}
