import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoorService {
  staticData = "https://localhost:44354/api";
  constructor(private http: HttpClient) { }

  GetImage(image: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Community/getImage/${image}`);
  }

  GetAllPosts(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Community/getAllPendingPosts`);
  }

  GetAllAprovedPosts(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Community/getAllApprovedPosts`);
  }

  GetAllRejectedPosts(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Community/getAllRejectedPosts`);
  }

}
