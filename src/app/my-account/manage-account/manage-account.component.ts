import { Component } from '@angular/core';

@Component({
  selector: 'app-my-coupons',
  template: `
    <div>
      <app-my-account-menu></app-my-account-menu>
      <div class="coupons-content">
        <h2>Minha conta</h2>
        <!-- Conteúdo dos meus cupons -->
      </div>
    </div>
  `,
  styles: [`
    .coupons-content {
      padding-left: 17%;
      margin-top: 5%;
    }
  `]
})

export class ManageAccountComponent {

}
