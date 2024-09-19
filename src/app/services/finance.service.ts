import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment";

@Injectable({
    providedIn: 'root'
})

export class FinanceService {
    private apiUrl = environment.apiUrl + 'finance';

    constructor(private http: HttpClient) {}

    getAccountsPayable(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/getAccountsPayable`)
    }
    }

    