import { Component } from '@angular/core';
import { NoorService } from '../../../Services/noor.service';

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


  ApprovedPosts() {
    this._ser.ApprovedPosts().subscribe((data) => {
      this.servicesArray = data;
      alert("")
    });
  }

  RejectedPosts() {
    this._ser.RejectedPosts().subscribe((data) => {
      this.servicesArray = data;
    });
  }

}
