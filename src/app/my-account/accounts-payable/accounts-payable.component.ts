import { Component } from '@angular/core';

@Component({
  selector: 'app-accounts-payable',
  templateUrl: './accounts-payable.component.html',
  styleUrls: ['./accounts-payable.component.css']
})
export class AccountsPayableComponent {

  itemsPerPage = 3;
  currentPage = 1;
  totalPages = 0;

  updatePagedCoupons(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    // this.pagedCoupons = this.discountsCoupons.slice(start, end);
  }

  changePage(event: Event, page: number): void {
    event.preventDefault(); 
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedCoupons();

    }
  }

}
