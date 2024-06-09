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
import { ManageAccountComponent } from './my-account/manage-account/manage-account.component';
import { MyCouponsComponent } from './my-account/my-coupons/my-coupons.component';

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
  { path: 'minha-conta', component: ManageAccountComponent},
  { path: 'meus-cupons', component: MyCouponsComponent},
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
