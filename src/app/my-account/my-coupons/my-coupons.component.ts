import { Component, OnInit } from '@angular/core';
import { CouponService } from 'src/app/services/coupons.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-my-coupons',
  templateUrl: './my-coupons.component.html',
  styleUrls: ['./my-coupons.component.css']
})
export class MyCouponsComponent implements OnInit {
  coupons: any[] = [];
  pagedCoupons: any[] = [];
  errorMessage: string | null = null;
  itemsPerPage = 3;
  currentPage = 1;
  totalPages = 0;


  constructor(private couponService: CouponService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.show();
    this.couponService.getUserCoupons().subscribe({
      next: (coupons) => {
        this.coupons = coupons;
        this.totalPages = Math.ceil(this.coupons.length / this.itemsPerPage);
        this.updatePagedCoupons();
      },
      error: (error) => {
        console.error('Error fetching coupons:', error);
      }
    });
    this.loadingService.hide();
  }

  updatePagedCoupons(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedCoupons = this.coupons.slice(start, end);
  }

  changePage(event: Event, page: number): void {
    event.preventDefault(); 
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedCoupons();

    }
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
