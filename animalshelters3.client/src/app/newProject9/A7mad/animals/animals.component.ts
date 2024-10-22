import { Component, OnInit, Input } from '@angular/core';
import { A7madService } from '../../../../Services/a7mad.service';
import { Animal } from '../../../../shared/interfaces';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {
  @Input() shelterId: any;
  animals: any

  constructor(private _ser: A7madService) { }

  ngOnInit() {
    this.fetchAnimals(this.shelterId);
    //if (this.shelterId) {
    //  this.fetchAnimals(this.shelterId);
    //}
  }

  ngOnChanges() {
    if (this.shelterId) {
      this.fetchAnimals(this.shelterId);
    }
  }

  fetchAnimals(shelterId: number) {
    this._ser.getAnimalsByShelter(2).subscribe(
      (data) => {
        this.animals = data;
      },
      (error) => {
        console.error('Error fetching animals:', error);
      }
    );
  }
}
