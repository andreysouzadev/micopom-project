import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './navegacao/home/home.component';
import { MenuComponent } from './navegacao/menu/menu.component';
import { FooterComponent } from './navegacao/footer/footer.component';
import { LoginComponent } from './acessos/login/login.component';
import { CadastroComponent } from './acessos/cadastro/cadastro.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EsqueceuSenhaComponent } from './acessos/esqueceu-senha/esqueceu-senha.component'
import { HttpClientModule } from '@angular/common/http';
import { CupomComponent } from './item/item.component';
import { CouponDetailComponent } from './coupon-detail/coupon-detail.component';
import { RegisterCouponComponent } from './coupon/register-coupon/register-coupon.component';
import { RegisterEstablishmentComponent } from './establishment/register-establishment/register-establishment.component';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/authInterceptor.service';
import { AuthService } from './auth/auth.service';
import { PaymentComponent } from './payment/payment.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { LoadingComponent } from './loading/loading.component';
import { ManageAccountComponent } from './my-account/manage-account/manage-account.component';
import { MyCouponsComponent } from './my-account/my-coupons/my-coupons.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';


import { ConfirmationComponent } from './confirmation/confirmation.component';
import { PaymentPixComponent } from './payment-pix/payment-pix.component';
import { ValidateCouponComponent } from './coupon/validate-coupon/validate-coupon.component';
import { TrackingService } from './services/tracking.service';
import { InteractionService } from './services/interaction.service';
import { AboutMicopomComponent } from './navegacao/footer/footer-pages/about-micopom/about-micopom/about-micopom.component';
import { HowtobyeComponent } from './navegacao/footer/footer-pages/how-to-buy/howtobye/howtobye.component';
import { DiscountsCouponsComponent } from './my-account/discounts-coupons/discounts-coupons.component';
import { AccountsPayableComponent } from './my-account/accounts-payable/accounts-payable.component';

registerLocaleData(localePt, 'pt-BR');


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    FooterComponent,
    LoginComponent,
    CadastroComponent,
    EsqueceuSenhaComponent,
    CupomComponent,
    CouponDetailComponent,
    RegisterCouponComponent,
    RegisterEstablishmentComponent,
    PaymentComponent,
    OrderSummaryComponent,
    LoadingComponent,
    ManageAccountComponent,
    MyCouponsComponent,
    ConfirmationComponent,
    PaymentPixComponent,
    ValidateCouponComponent,
    AboutMicopomComponent,
    HowtobyeComponent,
    DiscountsCouponsComponent,
    AccountsPayableComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    NgxMaskDirective,
  ],
  providers: [
    AuthService,
    provideNgxMask(),
    TrackingService,
    InteractionService,
    {provide: APP_BASE_HREF, useValue: '/'},
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
