import { Component } from '@angular/core';
import { LujainServiceService } from '../LujainService/lujain-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regester',
  templateUrl: './regester.component.html',
  styleUrl: './regester.component.css'
})
export class RegesterComponent {
  constructor(private _ser: LujainServiceService, private _router: Router) { }

  ngOnInit() { }


  SignUp(data: any) {
    debugger
    var form = new FormData();

    for (let key in data) {
      form.append(key, data[key])
    }
    this._ser.SignUserUp(form).subscribe(() => {
      alert("user added successfully")
      this._router.navigate(['']);
    },
      (error) => {
        alert(error.error)
      }
    )
  }
}
