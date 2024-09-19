import { Component, OnInit } from '@angular/core';
import { FinanceService } from 'src/app/services/finance.service';

@Component({
  selector: 'app-accounts-payable',
  templateUrl: './accounts-payable.component.html',
  styleUrls: ['./accounts-payable.component.css']
})
export class AccountsPayableComponent implements OnInit{
  accountsPayable: any[] = []
  constructor(
    private financeService: FinanceService
  ){}

  ngOnInit(): void {
    this.financeService.getAccountsPayable().subscribe(
      (data) => {
        this.accountsPayable = data;
        console.log(this.accountsPayable)
      }
    )
  }

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
