import { Component, OnInit } from '@angular/core';
import { NajlaaService } from '../../../Services/najlaa.service';
import { BehaviorSubjectService } from '../../newProject9/Lujain/BehaviorSubject/behavior-subject.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReplyDto } from '../../../shared/ReplyDto';
import Swal from 'sweetalert2';
import { Meta, Title } from '@angular/platform-browser';
import { LujainServiceService } from '../../newProject9/Lujain/LujainService/lujain-service.service';
declare var bootstrap: any;

@Component({
  selector: 'app-post-communityuser',
  templateUrl: './post-communityuser.component.html',
  styleUrls: ['./post-communityuser.component.css']
})
export class PostCommunityuserComponent implements OnInit {
  postContent: string = ''; // محتوى المنشور
  selectedFile: File | null = null; // الملف المختار

  approvedPosts: any[] = []; // List of approved posts
  currentUserId: string | undefined; // Current logged-in user ID
  selectedPost: any; // Post selected for viewing comments
  newComment: string = ''; // Comment input field content
  //newReply: { [key: number]: string } = {}; // New replies keyed by comment ID
  postTitle: string = ''; // Post title
  postTag: string = ''; // Post tag
  errorMessage: string | undefined;
  imagePreview: any;
  user: any = { image: '' };


  //approvedPosts: any[] = [];
  //currentUserId: string | undefined;
  //selectedPost: any;
  //newComment: string = '';
  //  errorMessage: string | undefined;
  //  postTitle: string | undefined;
  //  postTag: string | undefined;

  constructor(
    private najlaaService: NajlaaService,
    private behaviorSubjectService: BehaviorSubjectService,
    private http: HttpClient,
    private router: Router, private meta: Meta, private titleService: Title,
    private _ser:LujainServiceService
  ) { }

  ngOnInit() {
    // Subscribe to the user ID observable
    this.behaviorSubjectService.userId$.subscribe(userId => {
      this.currentUserId = userId;
      // Fetch approved posts only if logged in
      this.fetchApprovedPosts();
      //this.ShowUserDetails(Number( this.currentUserId = userId));

    });
  }
  openPostModal() {
    const postModal = new bootstrap.Modal(document.getElementById('PostModal') as HTMLElement);
    postModal.show();
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];

      // تأكد أن selectedFile ليس null
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreview = e.target.result;  // تعيين URL للصورة المصغرة
        };
        reader.readAsDataURL(this.selectedFile);  // قراءة الملف كـ Data URL
      }
    }
  }




  // Method to submit a new post
  submitPost() {
    debugger;
    const userId = Number(this.currentUserId);

    // التحقق من أن userId ليس null
    if (!userId) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Please log in before submitting a post.'
      });
      return; // إيقاف تنفيذ الوظيفة حتى يتم تسجيل الدخول
    }

    const postData = {
      userId: userId,
      title: this.postTitle,
      content: this.postContent,
      tag: this.postTag,
      file: this.selectedFile
    };

    this.najlaaService.addPost(postData).subscribe(
      response => {
        console.log('Post submitted successfully:', response);
        this.fetchApprovedPosts(); // Refresh the post list
        bootstrap.Modal.getInstance(document.getElementById('PostModal')).hide(); // Close modal

        // عرض رسالة تأكيد بعد إنشاء المنشور بنجاح
        Swal.fire({
          icon: 'success',
          title: 'Post Created!',
          text: 'Your post has been successfully created and is awaiting approval.',
          confirmButtonText: 'OK'
        });
      },
      error => {
        console.error('Error submitting post:', error);
        this.errorMessage = 'Failed to submit post.';
      }
    );
  }


  fetchApprovedPosts() {
    // جلب المنشورات المعتمدة
    this.najlaaService.getAllApprovedPosts().subscribe(
      (approvedData) => {
        this.approvedPosts = approvedData;

        // بعد جلب المنشورات المعتمدة، جلب المنشورات مع حالة الإعجاب
        this.najlaaService.getPostsWithLikes(Number(this.currentUserId)).subscribe(
          (likedPostsData: any[]) => {
            // تحديث حالة الإعجاب للمنشورات المعتمدة بناءً على البيانات المسترجعة
            this.approvedPosts.forEach((post: any) => {
              const likedPost = likedPostsData.find((p: any) => p.id === post.id);
              post.isLiked = likedPost ? likedPost.isLiked : false; // إذا وجد المنشور في حالة الإعجاب
            });
            console.log(this.approvedPosts);
          },
          (error: any) => {
            console.error('Error loading posts with likes', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching approved posts', error);
      }
    );
  }

  toggleLike(post: any) {
    if (!this.currentUserId) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please log in to like this post.',
        confirmButtonText: 'OK',
      }).then(() => {
        this.router.navigate(['/login']);
      });
      return;
    }

    // تحديث حالة الإعجاب في قاعدة البيانات
    this.najlaaService.likePost(post.id, Number(this.currentUserId)).subscribe(
      (response: any) => {
        if (response.message === 'Post liked') {
          post.likesCount++;
          post.isLiked = true;  // تحديد الإعجاب للمنشور
        } else if (response.message === 'Like removed') {
          post.likesCount--;
          post.isLiked = false; // إزالة الإعجاب للمنشور
        }
      },
      (error: any) => {
        console.error('Error liking post', error);
      }
    );
  }



  addComment(post: any) {
    const userId = Number(this.currentUserId);

    // تحقق من القيمة الحالية لـ `currentUserId`
    console.log('Current User ID:', this.currentUserId);

    // إذا لم يتم تسجيل الدخول
    if (!userId || isNaN(userId)) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please log in to add a comment.',
        confirmButtonText: 'OK',
      }).then(() => {
        this.router.navigate(['/login']); // الانتقال إلى صفحة تسجيل الدخول
      });
      return; // إنهاء الدالة إذا لم يكن المستخدم مسجلاً للدخول
    }

    // التحقق من أن التعليق ليس فارغاً
    if (this.newComment.trim()) {
      this.najlaaService.addComment(post.id, userId, this.newComment).subscribe(
        (response) => {
          post.comments.push(response);
          this.newComment = ''; // إعادة تعيين حقل التعليق
          post.errorMessage = ''; // إعادة تعيين رسالة الخطأ

          // SweetAlert لإعلام المستخدم بنجاح إضافة التعليق
          Swal.fire({
            icon: 'success',
            title: 'Comment Posted',
            text: 'Your comment has been successfully posted!',
            confirmButtonText: 'OK',
          });
        },
        (error) => {
          console.error('Error adding comment', error);
        }
      );
    }
  }

  addReply(comment: { id: number; replies: any[]; errorMessage?: string }) {
    const userId = Number(this.currentUserId); // التأكد من تعيين معرف المستخدم

    // تحقق من تسجيل الدخول
    if (!userId || isNaN(userId)) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please log in to add a reply.',
        confirmButtonText: 'OK',
      }).then(() => {
        this.router.navigate(['/login']); // الانتقال إلى صفحة تسجيل الدخول
      });
      return; // إنهاء الدالة إذا لم يكن المستخدم مسجلاً للدخول
    }

    // التحقق من أن الرد ليس فارغاً
    const replyContent = this.newReply[comment.id];
    if (replyContent && replyContent.trim()) {
      const replyDto: ReplyDto = {
        CommentId: comment.id,
        UserId: userId,
        Content: replyContent
      };

      // إضافة الرد إلى الخدمة
      this.najlaaService.addReply(replyDto).subscribe(
        (response: any) => {
          comment.replies.push(response); // أضف الرد إلى القائمة
          this.newReply[comment.id] = ''; // امسح الإدخال

          // عرض تنبيه نجاح
          Swal.fire({
            icon: 'success',
            title: 'Reply Posted',
            text: 'Your reply has been successfully posted!',
            confirmButtonText: 'OK',
          });
        },
        (error: any) => {
          console.error('Error adding reply', error);
          comment.errorMessage = 'Error adding reply. Please try again later.';
        }
      );
    } else {
      // رسالة خطأ إذا كان الرد فارغاً
      comment.errorMessage = 'Please enter a reply.';
    }
  }
  newReply: { [key: number]: string } = {}; // Track replies by comment ID

  openCommentsModal(post: any) {
    this.selectedPost = post; // Set the selected post for the modal
    const commentsModal = new bootstrap.Modal(document.getElementById('commentsModal') as HTMLElement);
    commentsModal.show();
  }


  // Function to generate the post URL
  // المتغير الذي سيحتوي على المنشور المختار
  
  // دالة لتحديد المنشور المختار وفتح نافذة المشاركة
  openShareModal(post: any) {
    debugger;
    this.selectedPost = post;
    const shareModal = new bootstrap.Modal(document.getElementById('shareModal'), {
      keyboard: false
    });
    shareModal.show();
  }
  // دالة لضبط Meta Tags للبوست
  // دالة للحصول على رابط البوست
  getPostUrl(postId: number): string {
    return `https://127.0.0.1:4200/post-communityuser/${postId}`;
  }

  // دالة مشاركة على فيسبوك
  shareOnFacebook(post: any) {
    const postUrl = this.getPostUrl(post.id);
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
    window.open(facebookShareUrl, '_blank');
  }

  // دالة مشاركة على تويتر
  shareOnTwitter(post: any) {
    const postUrl = this.getPostUrl(post.id);
    const message = encodeURIComponent(post.content);
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${message}&url=${encodeURIComponent(postUrl)}`;
    window.open(twitterShareUrl, '_blank');
  }

  //ShowUserDetails(userId: number): void {
  //  this._ser.getUser(userId).subscribe(
  //    (data: any) => {
  //      console.log('API Response:', data);
  //      this.user = data;

  //      if (this.user.image) {
  //        this.user.image = `https://localhost:44354/${this.user.image}`;
  //      }
  //    },
  //    (error: { error: { message: any; }; }) => {
  //      console.error("Error fetching user details:", error);
  //      Swal.fire({
  //        icon: 'error',
  //        title: 'Error',
  //        text: "Failed to fetch user details: " + (error.error.message || "An error occurred.")
  //      });
  //    }
  //  );
  //}



}
