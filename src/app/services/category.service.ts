import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment";
import { Categorias } from "../navegacao/home/home.component";

@Injectable({
    providedIn: 'root'
})

export class categoryService {
    private apiUrl = environment.apiUrl + 'general';

    constructor(private http: HttpClient) {}

    getCategories(): Observable<Categorias[]> {
        return this.http.get<Categorias[]>(`${this.apiUrl}/categorias`)
    }
    }

    