import { NgModule } from '@angular/core';
import { HomeComponent } from './navegacao/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './acessos/login/login.component';
import { CadastroComponent } from './acessos/cadastro/cadastro.component';

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cadastro', component: CadastroComponent},
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
