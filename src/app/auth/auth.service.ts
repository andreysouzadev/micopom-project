// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environment';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private apiUrl = environment.apiUrl + 'accounts';
    private tokenKey = 'authToken';
    private userSubject = new BehaviorSubject<any>(null);
    private logoutSubject = new Subject<void>(); // Adicionar Subject para logout
    private tokenSubject: BehaviorSubject<string | null>;

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem(this.tokenKey)
    if(token){
      this.tokenSubject = new BehaviorSubject<string | null>(token);
      this.loadUserDetails();
    } else {
      this.tokenSubject = new BehaviorSubject<string | null>(null);
    }
  }

  public getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  setToken(token: string): void{
      localStorage.setItem(this.tokenKey, token)
      this.tokenSubject.next(token)
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.tokenSubject.next(null);
  }

  login(email: string, password: string){
    return this.http.post<{token: string}>(`${this.apiUrl}/login`, { email, password }).subscribe(
        response => {
            if (response && response.token) {
                this.setToken(response.token);
                this.loadUserDetails();
                this.router.navigate(['/home']);
            } else {
            }
        }, error => {
        }
    );
  }

  logout() {
    this.clearToken();
    this.logoutSubject.next(); // Emite o evento de logout
    this.userSubject.next(null);
    this.router.navigate(['/home']);
  }

  getToken(): string | null {
    return this.tokenSubject.value
  }

  getLogoutSubject(): Observable<void> { // Método para obter o Subject de logout
    return this.logoutSubject.asObservable();
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getUser() {
    this.loadUserDetails()
    return this.userSubject.asObservable();
  }

  private loadUserDetails() {
    // Supondo que você tenha uma API para obter detalhes do usuário com base no token
    if(this.isLoggedIn()){
      const headers = this.getAuthHeaders();
      this.http.get<any>(`${this.apiUrl}/me`, {headers}).subscribe(user => {
        this.userSubject.next(user);
      }, error => {
      });
    }
    
  }

  register(
    email: string,
    password: string,
    nome: string,
    logradouro: string,
    uf: string,
    cidade: string,
    complemento: string,
    nlogradouro: string,
    telefone: string,
    cep: string
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {
      email,
      password,
      nome_completo: nome,
      logradouro,
      uf,
      cidade,
      complemento,
      nu_logradouro: nlogradouro,
      nu_telefone: telefone,
      nu_cep: cep
    });
  }
}