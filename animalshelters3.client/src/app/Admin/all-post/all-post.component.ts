import { Component } from '@angular/core';
import { NoorService } from '../../../Services/noor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrl: './all-post.component.css'
})
export class AllPostComponent {
  ngOnInit() {
    this.getPosts();
  }
  constructor(private _ser: NoorService) { }
  servicesArray: any[] = [];
  getPosts() {
    this._ser.GetAllPosts().subscribe((data) => {
      this.servicesArray = data;
    });
  }


  approvePost(postId: any): void {
    this._ser.ApprovedPosts(postId).subscribe({
      next: (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Approved!',
          text: 'Post approved successfully.',
          showConfirmButton: false,
          timer: 2000
        });
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Approved...',
          text: 'Post approved successfully.',
          showConfirmButton: true
        });
        console.error('Error approving post:', error);
      }
    });
  }

  rejectPost(postId: any): void {
    this._ser.RejectedPosts(postId).subscribe({
      next: (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Rejected!',
          text: 'Post rejected successfully.',
          showConfirmButton: false,
          timer: 2000
        });
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Rejected!...',
          text: 'Post rejected successfully',
          showConfirmButton: true
        });
        console.error('Error rejecting post:', error);
      }
    });
  }


}
