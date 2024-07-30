import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable} from 'rxjs';
import { environment } from 'src/environment';
import { Rating } from '../models/rating.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
    private apiUrl = environment.apiUrl + 'cupons';
    private userId: (number | null) = null;

    constructor(private http: HttpClient, private authService: AuthService) { }

    getUserCoupons(): Observable<any> {
      const headers = this.authService.getAuthHeaders();
      return this.http.get<any>(`${this.apiUrl}/my-coupons`, { headers }).pipe(
        catchError((error) => {
          console.error('Error fetching user coupons:', error);
          throw error;
        })
      );
    }

  registerCoupon(
    couponData: any, file: File, files:File[]

    ): Observable<any> {
        const formData = new FormData();
        const jsonData = {
            categoryList: couponData.categoryList,
            couponName: couponData.couponName,
            cuponQuantity: couponData.cuponQuantity,
            discountValue: couponData.discountValue,
            expirationDate: couponData.expirationDate,
            fullDescription: couponData.fullDescription,
            originalValue: couponData.originalValue,
            shortDescription: couponData.shortDescription,
            establishmentList: couponData.establishmentList
          };
        formData.append('couponData', JSON.stringify(jsonData));
      
          // Adicione o arquivo ao FormData
        formData.append('imageUrl', file, file.name)
        const x = Array.from(files);
        x.forEach((file, index) => {
          formData.append('imageUrl' + index, file, file.name)
        })

        // TRATA IMAGENS SECUNDARIAS
        return this.http.post(`${this.apiUrl}/novo_cupom`, 
        formData);
    }

    getRatings(
      establishmentId: number
    ): Observable<any> {
      return this.http.get<Rating[]>(`${this.apiUrl}/avaliacoes/${establishmentId}`)
    }
  }
