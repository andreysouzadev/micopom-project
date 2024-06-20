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

  updateUserData(userData: any): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<any>(`${this.apiUrl}/change-informations`, userData, {headers}). pipe(
      catchError(error => {
        console.error('Error updating user data', error);
        return throwError(error);
      })
    )
  }

  changePassword(passwordData: any): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<any>(`${this.apiUrl}/change-password-page`, passwordData, { headers }).pipe(
      catchError(error => {
        console.error('Error changing password:', error);
        return throwError(error);
      })
    );
  }

}
