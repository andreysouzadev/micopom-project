import { Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { TrackingService } from './services/tracking.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoading = false;
  title = 'micopom-project';

  private loadingSubscription: Subscription;

  constructor(
    private loadingService: LoadingService,
    private authService: AuthService,
    private trackingService: TrackingService
  ){}
  ngOnInit() {
    const token = this.authService.getToken();
    this.loadingSubscription = this.loadingService.loadingState.subscribe(
      (state: boolean) => {
        this.isLoading = state;
      }
    );
  }

  ngOnDestroy() {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
