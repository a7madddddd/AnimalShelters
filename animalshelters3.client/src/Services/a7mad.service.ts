import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class A7madService {

  constructor(private http: HttpClient) { }


  url = 'https://localhost:7295/api/';


  getAllShelters():Observable<any> {

    return this.http.get<any>(`${this.url}Shelters`)
  }
}
