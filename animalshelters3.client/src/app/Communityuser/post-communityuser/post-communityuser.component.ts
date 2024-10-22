import { Component } from '@angular/core';
import { NajlaaService } from '../../../Services/najlaa.service';

@Component({
  selector: 'app-post-communityuser',
  templateUrl: './post-communityuser.component.html',
  styleUrl: './post-communityuser.component.css'
})
export class PostCommunityuserComponent {


  approvedPosts: any[] = [];

  constructor(private najlaaService: NajlaaService) { }
  //toggleLike(post: any) {
  //  const currentUserId = this.userId.value; // الحصول على userId الفعلي

  //  if (!currentUserId) {
  //    console.error('User not logged in');
  //    return; // عدم متابعة إذا لم يكن هناك مستخدم مسجل الدخول
  //  }

  //  this.najlaaService.likePost(post.id, currentUserId).subscribe(
  //    (response: any) => {
  //      console.log(response.message);

  //      if (response.message === 'Post liked') {
  //        post.likesCount++;
  //      } else if (response.message === 'Like removed') {
  //        post.likesCount--;
  //      }
  //    },
  //    (error: any) => {
  //      console.error('Error liking post', error);
  //    }
  //  );
  //}

  ngOnInit() {
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
}
