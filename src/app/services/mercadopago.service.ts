import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {

  private scriptLoaded = false;

  constructor() { }

  loadScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.scriptLoaded) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://sdk.mercadopago.com/js/v2';
      script.onload = () => {
        this.scriptLoaded = true;
        resolve();
      };
      script.onerror = (error: any) => reject(error);

      document.body.appendChild(script);
    });
  }
}
