import { NgModule } from '@angular/core';
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
import { CupomComponent } from './item/item.component';
import { HttpClientModule } from '@angular/common/http';
import { CouponDetailComponent } from './coupon-detail/coupon-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    FooterComponent,
    LoginComponent,
    CadastroComponent,
    EsqueceuSenhaComponent
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
    CupomComponent,
    CouponDetailComponent,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
