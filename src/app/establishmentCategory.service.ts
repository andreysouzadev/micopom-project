import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment";
import { CategoriaEstabelecimento } from "./establishment/register-establishment/register-establishment.component";

@Injectable({
    providedIn: 'root'
})

export class establishmentCategoryService {
    private apiUrl = environment.apiUrl + 'general';

    constructor(private http: HttpClient) {}

    getCategories(): Observable<CategoriaEstabelecimento[]> {
        return this.http.get<CategoriaEstabelecimento[]>(`${this.apiUrl}/estabelecimentos_categorias`)
    }
    }