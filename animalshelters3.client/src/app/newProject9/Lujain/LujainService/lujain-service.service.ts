import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LujainServiceService {

  constructor(private http: HttpClient) { }
  staticData = "https://localhost:44354/api";

  SignUserUp(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/UserLujain`, data)
  }

}
