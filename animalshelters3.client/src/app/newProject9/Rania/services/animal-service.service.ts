import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from '../../../../shared/interfaces'; // Assuming you have Animal interface

import { Category } from '../../../../shared/interfaces';  // Make sure to import the Category interface
import { AdoptionApplication } from '../../../../Services/a7mad.service';


@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  [x: string]: any;
  private apiUrl = 'https://localhost:44354/api/Animal';

  constructor(private http: HttpClient) { }

  // Fetch all animals
  getAllAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.apiUrl}/AllAnimals`);
  }

  // Get a specific animal by ID
  getAnimalById(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${this.apiUrl}/${id}`);
  }

  // Add a new animal
  addAnimal(animal: Animal): Observable<Animal> {
    return this.http.post<Animal>(`${this.apiUrl}/AddAnimal`, animal);
  }

  // Update an existing animal
  updateAnimal(id: number, animal: Animal): Observable<Animal> {
    return this.http.put<Animal>(`${this.apiUrl}/${id}`, animal);
  }

  // Delete an animal
  deleteAnimal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Fetch all categories (for dropdown or other purposes)
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);


  }


  getAnimalsByShelterId(shelterId: number): Observable<Animal[]> {
    return this.http.get<Animal[]>(`https://localhost:44354/api/Animal?shelterId=${shelterId}`);
  }

  /////////////////////////////////////////

  submitAdoptionApplication(application: AdoptionApplication): Observable<AdoptionApplication> {
    return this.http.post<AdoptionApplication>(`https://localhost:44354/api/Adoption`, application);
  }
 
  getAnimalsByCategory(categoryId: number): Observable<Animal[]> {
    return this.http.get<Animal[]>(`https://localhost:44354/api/Animal/byCategory/${categoryId}`);
  }



}
