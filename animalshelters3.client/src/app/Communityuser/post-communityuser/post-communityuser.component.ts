import { Component, OnInit } from '@angular/core';
import { NajlaaService } from '../../../Services/najlaa.service';
import { BehaviorSubjectService } from '../../newProject9/Lujain/BehaviorSubject/behavior-subject.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReplyDto } from '../../../shared/ReplyDto';

declare var bootstrap: any;

@Component({
  selector: 'app-post-communityuser',
  templateUrl: './post-communityuser.component.html',
  styleUrls: ['./post-communityuser.component.css']
})
export class PostCommunityuserComponent implements OnInit {
  //openPostModal() {
  //  console.log('تم فتح النافذة المنبثقة');
  //  // هنا يمكنك إضافة الكود الذي يقوم بفتح الـ modal 
  //}

  //postContent: string = '';  // محتوى المنشور
  //postTitle: string = '';     // عنوان المنشور
  //postTag: string = '';       // علامة المنشور
  //selectedFile: File | null = null;  // الملف المختار

  //// دالة لمعالجة إضافة المنشور
  //createPost(form: any) {
  //  if (!this.postContent || !this.postTitle || !this.postTag) {
  //    alert('الرجاء ملء جميع الحقول.');  // يمكنك استخدام SweetAlert بدلاً من alert
  //    return;
  //  }

  //  const postData = {
  //    title: this.postTitle,
  //    content: this.postContent,
  //    tag: this.postTag,
  //    file: this.selectedFile  // يمكنك تعديل ذلك حسب كيفية التعامل مع الملف في API
  //  };

  //  this.najlaaService.addPost(postData).subscribe(
  //    (response: any) => {
  //      console.log('Post created successfully:', response);
  //      // إعادة تعيين الحقول
  //      this.postContent = '';
  //      this.postTitle = '';
  //      this.postTag = '';
  //      this.selectedFile = null;
  //      // يمكنك إغلاق المودال هنا إذا كنت تستخدم Bootstrap
  //      // $('#PostModal').modal('hide');  // استخدم jQuery لإغلاق المودال إذا لزم الأمر
  //    },
  //    (error: any) => {
  //      console.error('Error creating post:', error);
  //      alert('حدث خطأ أثناء إنشاء المنشور. حاول مرة أخرى.');  // يمكنك استخدام SweetAlert بدلاً من alert
  //    }
  //  );
  //}

  //// دالة لاختيار الملف
  //onFileSelected(event: any) {
  //  this.selectedFile = event.target.files[0];  // تخزين الملف المختار
  //}

  approvedPosts: any[] = [];
  currentUserId: string | undefined;
  selectedPost: any;
  newComment: string = '';
    errorMessage: string | undefined;

  constructor(
    private najlaaService: NajlaaService,
    private behaviorSubjectService: BehaviorSubjectService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    // Subscribe to the user ID observable
    this.behaviorSubjectService.userId$.subscribe(userId => {
      this.currentUserId = userId;
        // Fetch approved posts only if logged in
        this.fetchApprovedPosts();
      
    });
  }

  fetchApprovedPosts() {
    // Fetch approved posts from the service
    this.najlaaService.getAllApprovedPosts().subscribe(
      (data) => {
        this.approvedPosts = data;
        console.log(this.approvedPosts);
      },
      (error) => {
        console.error('Error fetching approved posts', error);
      }
    );
  }

  toggleLike(post: any) {
    if (!this.currentUserId) {
      alert('Please log in to like this post.');
      this.router.navigate(['/login']);
      return;
    }

    this.najlaaService.likePost(post.id, Number(this.currentUserId)).subscribe(
      (response: any) => {
        if (response.message === 'Post liked') {
          post.likesCount++;
        } else if (response.message === 'Like removed') {
          post.likesCount--;
        }
      },
      (error: any) => {
        console.error('Error liking post', error);
      }
    );
  }

  addComment(post: any) {
    if (this.newComment.trim()) {
      const userId = Number(this.currentUserId);

      if (!isNaN(userId)) {
        this.najlaaService.addComment(post.id, userId, this.newComment).subscribe(
          (response) => {
            post.comments.push(response);
            this.newComment = '';
            post.errorMessage = ''; // Reset error message if comment added successfully
          },
          (error) => {
            console.error('Error adding comment', error);
          }
        );
      } else {
        console.error('User ID is invalid or undefined.');
        post.errorMessage = 'Please log in to add a comment.'; // Set error message for the specific post
      }
    }
  }
  addReply(comment: { id: number; replies: any[]; errorMessage?: string }) {
    const userId = Number(this.currentUserId); // تأكد من تعيين معرف المستخدم بشكل صحيح
    const replyContent = this.newReply[comment.id];

    if (replyContent && replyContent.trim()) {
      const replyDto: ReplyDto = {
        CommentId: comment.id,
        UserId: userId,
        Content: replyContent
      };

      this.najlaaService.addReply(replyDto).subscribe(
        (response: any) => {
          comment.replies.push(response); // أضف الرد إلى القائمة
          this.newReply[comment.id] = ''; // امسح الإدخال
        },
        (error: any) => {
          console.error('Error adding reply', error);
          comment.errorMessage = 'Error adding reply. Please try again later.';
        }
      );
    } else {
      comment.errorMessage = 'Please enter a reply.';
    }
  }

  newReply: { [key: number]: string } = {}; // Track replies by comment ID


  openShareModal(post: any) {
    this.selectedPost = post;
    const shareModal = new bootstrap.Modal(document.getElementById('shareModal') as HTMLElement);
    shareModal.show();
  }

  shareOnPlatform(platform: 'whatsapp' | 'facebook', postId: number) {
    this.http.get(`https://localhost:44354/api/Community/sharePost/${platform}/${postId}`).subscribe(
      (response: any) => {
        window.open(response.shareUrl, '_blank');
      },
      (error) => {
        console.error(`Error sharing post on ${platform}`, error);
      }
    );
  }

  shareOnWhatsApp(post: any) {
    this.shareOnPlatform('whatsapp', post.id);
  }
  openCommentsModal(post: any) {
    this.selectedPost = post; // Set the selected post for the modal
    const commentsModal = new bootstrap.Modal(document.getElementById('commentsModal') as HTMLElement);
    commentsModal.show();
  }

  shareOnFacebook(post: any) {
    this.shareOnPlatform('facebook', post.id);
  }
}
