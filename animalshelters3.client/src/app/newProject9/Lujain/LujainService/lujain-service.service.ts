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

  LoginUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/UserLujain/Login`, data)
  }

  getUser(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/UserLujain/${id}`);
  }


  updateProfile(userId: number, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.staticData}/UserLujain/${userId}`, formData);
  }

  getAdoptionApp(userId: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/UserLujain/AdoptionByUserId/${userId}`);
  }

  getAdoptionAppDetails(appId: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/UserLujain/FromId/${appId}`);
  }
}
