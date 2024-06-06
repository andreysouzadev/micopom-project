import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterCouponService {
    private apiUrl = environment.apiUrl + 'cupons';

  constructor(private http: HttpClient) { }

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
        // // Adicione os outros campos ao FormData
        // formData.append('categoryList', couponData.categoryList);
        // formData.append('couponName', couponData.couponName);
        // formData.append('cuponQuantity', couponData.cuponQuantity.toString());
        // formData.append('discountValue', couponData.discountValue.toString());
        // formData.append('expirationDate', couponData.expirationDate);
        // formData.append('fullDescription', couponData.fullDescription);
        // formData.append('originalValue', couponData.originalValue.toString());
        // formData.append('shortDescription', couponData.shortDescription);
        // // Adicione o arquivo ao FormData
        // formData.append('imageUrl', file, file.name);   
    }
  }
