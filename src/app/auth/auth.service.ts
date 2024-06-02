// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private apiUrl = environment.apiUrl + 'accounts';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  register(
    email: string, 
    password: string,
    nome: string,
    no_logradouro: string,
    no_uf: string,
    no_cidade: string,
    de_complemento: string,
    nu_logradouro: string,
    nu_telefone: string
    ): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, 
        { 
            email, 
            password,
            nome_completo: nome,
            logradouro: no_logradouro,
            uf: no_uf,
            cidade :no_cidade,
            complemento: de_complemento,
            nu_logradouro,
            nu_telefone
        });
    }
}
