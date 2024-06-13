import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment'; // Importe o ambiente correto
import { Cupom } from './item/item.component'; // Ajuste o caminho conforme necessário

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = environment.apiUrl + 'cupons';

  constructor(private http: HttpClient) {}

  getItems(): Observable<Cupom[]> {
    return this.http.get<Cupom[]>(`${this.apiUrl}/cupons_disponiveis`);
  }

  getItemById(id: string): Observable<any> {
    return this.http.get<Cupom[]>(`${this.apiUrl}/cupons_disponiveis/${id}`);
  }

  getItemByCategory(category: string): Observable<Cupom[]> {
    return this.http.get<Cupom[]>(`${this.apiUrl}/cupons_categoria/${category}`);
  }

}
