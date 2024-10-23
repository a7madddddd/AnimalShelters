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

  getImage(image: any) {
    this._ser.GetImage(image).subscribe((data) => {
      this.servicesArray = data;
    });
  }
}
