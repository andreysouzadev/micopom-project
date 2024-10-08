import { NgModule } from '@angular/core';
import { HomeComponent } from './navegacao/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './acessos/login/login.component';
import { CadastroComponent } from './acessos/cadastro/cadastro.component';
import { EsqueceuSenhaComponent } from './acessos/esqueceu-senha/esqueceu-senha.component';
import { CouponDetailComponent } from './coupon-detail/coupon-detail.component';
import { RegisterCouponComponent } from './coupon/register-coupon/register-coupon.component';
import { RegisterEstablishmentComponent } from './establishment/register-establishment/register-establishment.component';
import { AuthGuard } from './auth/auth.guard';
import { PaymentComponent } from './payment/payment.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ManageAccountComponent } from './my-account/manage-account/manage-account.component';
import { MyCouponsComponent } from './my-account/my-coupons/my-coupons.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { PaymentPixComponent } from './payment-pix/payment-pix.component';
import { ValidateCouponComponent } from './coupon/validate-coupon/validate-coupon.component';
import { AboutMicopomComponent } from './navegacao/footer/footer-pages/about-micopom/about-micopom/about-micopom.component';
import { HowtobyeComponent } from './navegacao/footer/footer-pages/how-to-buy/howtobye/howtobye.component';
import { DiscountsCouponsComponent } from './my-account/discounts-coupons/discounts-coupons.component';
import { AccountsPayableComponent } from './my-account/accounts-payable/accounts-payable.component';

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cadastro', component: CadastroComponent},
  { path: 'esqueceu-senha', component: EsqueceuSenhaComponent},
  { path: 'coupon/:id', component: CouponDetailComponent},
  { path: 'cadastro', component: CadastroComponent},
  { path: 'registro-cupom', component: RegisterCouponComponent, canActivate: [AuthGuard]},
  { path: 'registro-estabelecimento', component: RegisterEstablishmentComponent, canActivate: [AuthGuard]},
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard]},
  { path: 'order-summary', component: OrderSummaryComponent, canActivate: [AuthGuard]},
  { path: 'minha-conta', component: ManageAccountComponent, canActivate: [AuthGuard]},
  { path: 'meus-cupons', component: MyCouponsComponent, canActivate: [AuthGuard]},
  { path: 'confirmation', component: ConfirmationComponent, canActivate: [AuthGuard]},
  { path: 'payment-pix', component: PaymentPixComponent, canActivate: [AuthGuard]},
  { path: 'validate-coupon/:activateCode', component: ValidateCouponComponent, canActivate: [AuthGuard]},
  { path: 'about-micopom', component: AboutMicopomComponent},
  { path: 'how-to-bye', component: HowtobyeComponent},
  { path: 'cupons-desconto', component: DiscountsCouponsComponent, canActivate: [AuthGuard]},
  { path: 'contas-a-pagar', component: AccountsPayableComponent, canActivate: [AuthGuard]},
  {
    path: '',
    children: [
      { path:'', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent},
      
    ]
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
