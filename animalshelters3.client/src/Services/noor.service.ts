import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class NoorService {
  staticData = "https://localhost:44354/api";
  userId: any = 1;
  constructor(private http: HttpClient) { }

  GetAllPosts(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Community/getAllPendingPosts`);
  }

  GetAllAprovedPosts(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Community/getAllApprovedPosts`);
  }

  GetAllRejectedPosts(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Community/getAllRejectedPosts`);
  }

  ApprovedPosts(postId: any): Observable<any> {
    return this.http.post<any>(
      `${this.staticData}/Community/approvePost/${postId}`,
      {}
    );
  }
  RejectedPosts(postId: any): Observable<any> {
    return this.http.post<any>(
      `${this.staticData}/Community/rejectPost/${postId}`,
      {}
    );
  }

}
