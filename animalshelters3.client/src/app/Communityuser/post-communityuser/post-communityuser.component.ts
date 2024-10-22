import { Component, OnInit } from '@angular/core';
import { NajlaaService } from '../../../Services/najlaa.service';
import { BehaviorSubjectService } from '../../newProject9/Lujain/BehaviorSubject/behavior-subject.service';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for API calls

declare var bootstrap: any; // To use Bootstrap's JS functionality

@Component({
  selector: 'app-post-communityuser',
  templateUrl: './post-communityuser.component.html',
  styleUrls: ['./post-communityuser.component.css']
})
export class PostCommunityuserComponent implements OnInit {

  approvedPosts: any[] = [];
  currentUserId: string | undefined;
  selectedPost: any; // Holds the post selected for sharing

  constructor(private najlaaService: NajlaaService, private behaviorSubjectService: BehaviorSubjectService, private http: HttpClient) { }

  ngOnInit() {
    // Subscribe to userId$ to get the current user ID
    this.behaviorSubjectService.userId$.subscribe(userId => {
      this.currentUserId = userId;
    });

    // Fetch all approved posts
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

  // Toggle like functionality
  toggleLike(post: any) {
    if (!this.currentUserId) {
      console.error('User not logged in');
      return;
    }

    this.najlaaService.likePost(post.id, Number(this.currentUserId)).subscribe(
      (response: any) => {
        console.log(response.message);

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

  // Open the modal for sharing
  openShareModal(post: any) {
    this.selectedPost = post;
    const shareModal = new bootstrap.Modal(document.getElementById('shareModal') as HTMLElement);
    shareModal.show();
  }

  // Share on WhatsApp
  shareOnWhatsApp(post: any) {
    this.http.get(`https://localhost:44354/api/Community/sharePost/whatsapp/${post.id}`).subscribe(
      (response: any) => {
        window.open(response.shareUrl, '_blank');
      },
      (error) => {
        console.error('Error sharing post on WhatsApp', error);
      }
    );
  }

  // Share on Facebook
  shareOnFacebook(post: any) {
    this.http.get(`https://localhost:44354/api/Community/sharePost/facebook/${post.id}`).subscribe(
      (response: any) => {
        window.open(response.shareUrl, '_blank');
      },
      (error) => {
        console.error('Error sharing post on Facebook', error);
      }
    );
  }
}
