// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private apiUrl = environment.apiUrl + 'accounts';
    private tokenKey = 'authToken';
    private userSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {
    const token = this.getToken();
    if(token){
        this.loadUserDetails();
    }
  }

  public getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  login(email: string, password: string){
    return this.http.post<{token: string}>(`${this.apiUrl}/login`, { email, password }).subscribe(
        response => {
            if (response && response.token) {
                localStorage.setItem(this.tokenKey, response.token);
                this.loadUserDetails();
                this.router.navigate(['/home']);
            } else {
                console.log('Token not received in the response');
            }
        }, error => {
            console.error('Login error', error);
        }
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.userSubject.next(null);
    this.router.navigate(['/home']);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  private loadUserDetails() {
    // Supondo que você tenha uma API para obter detalhes do usuário com base no token
    const headers = this.getAuthHeaders();
    this.http.get<any>(`${this.apiUrl}/me`, {headers}).subscribe(user => {
      this.userSubject.next(user);
    }, error => {
        console.log('Failed to load user details', error);
    });
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
