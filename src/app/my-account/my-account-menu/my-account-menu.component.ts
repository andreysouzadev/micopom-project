import { Component } from '@angular/core';

@Component({
  selector: 'app-my-account-menu',
  templateUrl: './my-account-menu.component.html',
  styleUrls: ['./my-account-menu.component.css']
})
export class MyAccountMenuComponent {
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
}
}