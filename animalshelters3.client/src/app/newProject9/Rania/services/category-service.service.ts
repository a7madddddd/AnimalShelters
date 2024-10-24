import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../../../shared/interfaces';
import { Animal } from '../../../../shared/interfaces';
@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  private apiUrl = 'https://localhost:7295/api/Category';  // Adjust the API URL as needed

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl); 
  }

  getAnimalsByCategory(categoryId: number): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.apiUrl}/animals/byCategory/${categoryId}`);
  }

}
