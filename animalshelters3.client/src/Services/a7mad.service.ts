import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';






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
  private url = 'https://localhost:44354/api/';

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


  addShelters(data: any): Observable<any> { // Ensure it returns an Observable
    return this.http.post(this.url, data);
  }

  }

