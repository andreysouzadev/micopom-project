import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CouponService } from 'src/app/services/coupons.service';

@Component({
  selector: 'app-validate-coupon',
  templateUrl: './validate-coupon.component.html',
  styleUrls: ['./validate-coupon.component.css']
})
export class ValidateCouponComponent implements OnInit{
  userProfile: number;
  accessDenied: boolean = false;
  private userSubscription: Subscription;
  activateCode: string | null;
  result: boolean = false;

  constructor(
    private authService: AuthService, 
    private couponService: CouponService,
    private route: ActivatedRoute
  ){}
  ngOnInit() {
    this.userSubscription = this.authService.getUser().subscribe(user => {
      if(user && user.co_perfil !== 2){
        console.log(user)
        this.accessDenied = true;
      }
    });

    this.activateCode = this.route.snapshot.paramMap.get('activateCode')

    this.validateCoupon();
  }

  validateCoupon(): void {
    if(this.activateCode){
      const x = this.couponService.validateCoupon(
        this.activateCode
      ).subscribe(result => {
        if(result.status === 403){
          this.accessDenied = true;
          return;
        }
        
        this.result = true;
      })
    }
    
    
  }

}
