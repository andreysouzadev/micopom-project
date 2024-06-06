// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {
  getCategories() {
    throw new Error('Method not implemented.');
  }
    private apiUrl = environment.apiUrl + 'sponsors';

  constructor(private http: HttpClient) { }

  registerEstablishment(
    no_estabelecimento: string, 
    tp_estabelecimento: string,
    no_logradouro: string,
    no_uf: string,
    no_cidade: string,
    de_complemento: string,
    nu_logradouro: number,
    nu_telefone: number
    ): Observable<any> {
        return this.http.post(`${this.apiUrl}/novo_estabelecimento`,
        { 
            no_estabelecimento, 
            tp_estabelecimento,
            logradouro: no_logradouro,
            uf: no_uf,
            cidade :no_cidade,
            complemento: de_complemento,
            nu_logradouro,
            nu_telefone
        });
    }
}
