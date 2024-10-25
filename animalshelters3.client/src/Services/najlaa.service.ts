import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReplyDto } from '../shared/ReplyDto';

@Injectable({
  providedIn: 'root'
})

export class NajlaaService {

  private baseUrl = 'https://localhost:44354/api'; // URL الخاص بـ API الخاص بك
  getWhatsAppShareUrl(postId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/Community/sharePost/whatsapp/${postId}`);
  }

  getFacebookShareUrl(postId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/Community/sharePost/facebook/${postId}`);
  }
  constructor(private http: HttpClient) { }
  likePost(postId: number, userId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/Community/likePost?postId=${postId}&userId=${userId}`, {});
  }
  // دالة لجلب المنشورات المعتمدة
  getAllApprovedPosts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Community/getAllApprovedPosts`);
  }
  getPostsWithLikes(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}Community/getLikesByUser?userId=${userId}`);
  }

  addReply(replyDto: ReplyDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/Community/addReply`, replyDto);
  }

  addComment(postId: number, userId: number, content: string): Observable<any> {
    const comment = { postId, userId, content };
    return this.http.post(`${this.baseUrl}/Community/addComment`, comment);
  }
  addPost(postData: any): Observable<any> {
    debugger;
    const formData = new FormData();
    formData.append('UserId', postData.userId);  // إضافة UserId
    formData.append('title', postData.title);
    formData.append('content', postData.content);
    formData.append('tag', postData.tag);

    // تحقق من وجود ملف قبل إضافته
    if (postData.file) {
      formData.append('ImageFile', postData.file, postData.file.name);
    }

    // إرسال البيانات إلى الـ API
    return this.http.post(`${this.baseUrl}/Community/createPost`, formData);  // تأكد أن الـ API يتعامل مع FormData
  }

}
