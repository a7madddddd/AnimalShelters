import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QadomiService {

  constructor(private http: HttpClient) { }


  staticData = "https://localhost:44354/api"

  addContact(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/ContactUs/AddContact`, data)
  }

  getContact(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/ContactUs/GetByDesc`);

  }

  deletContact(id: any): Observable<any> {

    return this.http.delete<any>(`${this.staticData}/ContactUs/DeleteContact/${id}`)
  }
}
