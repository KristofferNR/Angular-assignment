import { HttpClient } from "@angular/common/http"
import { inject, Injectable } from "@angular/core"

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    private apiUrl = 'http://localhost:8000/api/products'
}