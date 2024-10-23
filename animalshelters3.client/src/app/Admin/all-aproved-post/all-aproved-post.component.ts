import { Component } from '@angular/core';
import { NoorService } from '../../../Services/noor.service';

@Component({
  selector: 'app-all-aproved-post',
  templateUrl: './all-aproved-post.component.html',
  styleUrl: './all-aproved-post.component.css'
})
export class AllAprovedPostComponent {

  ngOnInit() {
    this.getPosts();
  }
  constructor(private _ser: NoorService) { }
  servicesArray: any[] = [];
  getPosts() {
    this._ser.GetAllAprovedPosts().subscribe((data) => {
      this.servicesArray = data;
    });
  }

  getImage(image : any) {
    this._ser.GetImage(image).subscribe((data) => {
      this.servicesArray = data;
    });
  }
}
