// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { CategoriaEstabelecimento, Estabelecimento } from "../establishment/register-establishment/register-establishment.component";

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {
    private apiUrl = environment.apiUrl + 'sponsors';

  constructor(private http: HttpClient) { }

  registerEstablishment(
    no_estabelecimento: string, 
    tp_estabelecimento: string,
    no_logradouro: string,
    no_uf: string,
    no_cidade: string,
    de_complemento: string,
    nu_logradouro: string,
    nu_telefone: string
    ): Observable<any> {
        return this.http.post(`${this.apiUrl}/novo_estabelecimento`,
        { 
            no_estabelecimento,
            tp_estabelecimento,
            no_logradouro,
            no_uf,
            no_cidade,
            de_complemento,
            nu_logradouro,
            nu_telefone
        });
    }

    getCategories(): Observable<CategoriaEstabelecimento[]> {
      return this.http.get<CategoriaEstabelecimento[]>(`${this.apiUrl}/estabelecimentos_categorias`)
  }

    getEstablishments(): Observable<Estabelecimento[]> {
      return this.http.get<Estabelecimento[]>(`${this.apiUrl}/estabelecimentos `)
    }
}
