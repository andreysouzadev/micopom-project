import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { environment } from 'src/environment';

interface LogData {
  type: string;
  page: string;
  timeSpent?: number;
  timestamp: Date;
  couponId?: number;
}


@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  private pageEntryTime: number;
  constructor(
    private http: HttpClient,
    private router: Router
  ) { 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart){
        if(this.pageEntryTime){
          this.logPageTime(window.location.pathname, new Date().getTime() - this.pageEntryTime);
        }
      }
      if (event instanceof NavigationEnd){
        this.pageEntryTime = new Date().getTime();
        this.logPageView(event.urlAfterRedirects);
      }
    })
  }

  apiUrl = environment.apiUrl;

  logPageView(url: string, couponId?: number){
    const data = {
      type: 'page_view',
      page: url,
      id_cupom: couponId || null,
      timestamp: new Date()
    };
    this.http.post(`${this.apiUrl}accounts/log`, data).subscribe();
  }

  logPageTime(page: string, timeSpent: number){
    const data: LogData = {
      type: 'time_spent',
      page: page,
      timeSpent: timeSpent,
      timestamp: new Date()
    };
    // Verificar se a página é 'coupon/XX' e adicionar 'couponId'
    const match = page.match(/coupon\/(\d+)/);
    if (match) {
      data.couponId = parseInt(match[1], 10);
    }
    this.http.post(`${this.apiUrl}accounts/log`, data).subscribe();
  }

  logAction(actionType: string, element: string, couponId?:number){
    const data = {
      type: actionType,
      page: window.location.pathname,
      element: element,
      couponId: couponId || null,
      timestamp: new Date()
    };
    this.http.post(`${this.apiUrl}accounts/log`, data).subscribe();
  }
}
