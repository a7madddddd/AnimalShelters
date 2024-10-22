import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NajlaaService {

  private baseUrl = 'https://localhost:44354/api'; // URL الخاص بـ API الخاص بك

  constructor(private http: HttpClient) { }
  likePost(postId: number, userId: number) {
    return this.http.post(`${this.baseUrl}/Community/likePost?postId=${postId}&userId=${userId}`, {});

  }
  // دالة لجلب المنشورات المعتمدة
  getAllApprovedPosts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Community/getAllApprovedPosts`);
  }
}
