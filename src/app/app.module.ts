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
import { NgBrazil } from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';
import { CustomFormsModule } from 'ng2-validation';
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
import { ManageAccountComponent } from './my-account/manage-account/manage-account.component';
import { MyCouponsComponent } from './my-account/my-coupons/my-coupons.component';
import { MyAccountMenuComponent } from './my-account/my-account-menu/my-account-menu.component';

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
    ManageAccountComponent,
    MyCouponsComponent,
    MyAccountMenuComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    NgBrazil,
    TextMaskModule,
    CustomFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    AuthService,
    {provide: APP_BASE_HREF, useValue: '/'},
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
