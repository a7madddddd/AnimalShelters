import { Component } from '@angular/core';
import { NoorService } from '../../../Services/noor.service';

@Component({
  selector: 'app-all-reject-post',
  templateUrl: './all-reject-post.component.html',
  styleUrl: './all-reject-post.component.css'
})
export class AllRejectPostComponent {
  ngOnInit() {
    this.getPosts();
  }
  constructor(private _ser: NoorService) { }
  servicesArray: any[] = [];
  getPosts() {
    this._ser.GetAllRejectedPosts().subscribe((data) => {
      this.servicesArray = data;
    });
  }
}
