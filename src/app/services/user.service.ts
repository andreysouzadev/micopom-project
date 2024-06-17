import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private apiUrl = environment.apiUrl + 'accounts';

  constructor(private http: HttpClient, private authService: AuthService) { } 

  getUserData(): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/me`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching user data:', error);
        return throwError(error);
      })
    );
  }
}



