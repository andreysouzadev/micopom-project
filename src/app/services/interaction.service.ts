import { HttpClient } from '@angular/common/http';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  private renderer: Renderer2;
  apiUrl = environment.apiUrl;
  constructor(
    rendererFactory: RendererFactory2,
    private http: HttpClient
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
   }

   trackClicks(element: HTMLElement, cupom_id?: number){
    this.renderer.listen(element, 'click', (event) => {
      console.log(element)
      console.log(event)
      const data = {
        type: 'click',
        element: element.tagName,
        couponId: cupom_id || null,
        page: window.location.pathname,
        timestamp: new Date()
      };

      this.http.post(`${this.apiUrl}accounts/log`, data).subscribe();
    })
   }


}
