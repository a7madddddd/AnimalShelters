import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


export interface ShelterDTO {

  name: string;
  address?: string;
  phone?: string;
  email: string;
  verified?: boolean;
  createdAt?: string; // Or Date
}




export interface AdoptionApplication {
  applicationId?: number;
  userId: number;
  animalId: number;
  status?: string;
  submittedAt?: Date;
  message: string;
  updatedAt?: Date;
}




export interface Shelter {
  shelterId: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  verified: boolean;
  createdAt: string;
}

export interface Animal {
  animalId: number;
  name: string;
  categoryId: number;
  breed: string;
  age: number;
  shelterId: number;
  temperament: string;
  adoptionStatus: string;
  imageUrl: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class A7madService {
  private url = 'https://localhost:7295/api/';

  constructor(private http: HttpClient) { }

  getAllShelters(): Observable<Shelter[]> {
    return this.http.get<Shelter[]>(`${this.url}Shelters`).pipe(
      catchError(error => {
        console.error('Error fetching shelters:', error);
        return throwError(error);
      })
    );
  }

  getAnimalsByShelter(shelterId: number): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.url}Shelters/${shelterId}`).pipe(
      catchError(error => {
        console.error('Error fetching animals for shelter:', error);
        return throwError(error);
      })
    );
  }
  //https://localhost:44354/api/


  private url2 = 'https://localhost:44354/api/Shelters/addShelter'; // Updated API URL


  addShelters(data: any): Observable<any> {
    // Send the data directly without wrapping it in another object
    return this.http.post(this.url2, data);
  }


  getAllSheltersAdmin(): Observable<any> {

    return this.http.get<any>(`${this.url}Shelters`)
  }

  //https://localhost:7295/api/Shelters/11


  getShelterById(id: number): Observable<ShelterDTO> {
    return this.http.get<ShelterDTO>(`${this.url}Shelters/${id}`);
  }

  updateShelter(id: number, shelter: ShelterDTO): Observable<any> {
    return this.http.put<any>(`${this.url}Shelters/${id}`, shelter);
  }

  deleteShelter(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}Shelters/${id}`);
  }





  private apiUrl = 'https://localhost:7295/api/Adoption'; // Adjust the API URL


  getAllAdoptions(): Observable<any[]> { // Use 'any' instead of a specific type
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteAdoption(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

