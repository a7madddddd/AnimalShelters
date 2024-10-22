import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Shelter {
  shelterId: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  verified: boolean;
  createdAt: string; // Or use Date if needed
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
}
