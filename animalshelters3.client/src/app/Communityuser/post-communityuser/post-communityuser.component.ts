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
