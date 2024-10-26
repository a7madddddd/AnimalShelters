import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoorService {
  staticData = "https://localhost:7295/api";
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

  userId: any;
  rejectPost: any;
  approvePost: any;
  RejectedPosts(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Community/rejectPost/${this.rejectPost}?approverUserId=${this.userId}`);
  }
  ApprovedPosts(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Community/approvePost/${this.approvePost}?approverUserId=${this.userId}`);
  }

}
